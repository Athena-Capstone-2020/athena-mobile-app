import { default as axios } from 'axios'
import { FoodItem } from '../../models'
import { logError } from '../../logger/Logger'

export class BarcodeService {
    constructor(barcodeApiKey){
        this.BARCODE_API_KEY = barcodeApiKey
    }

    BARCODE_API_KEY = null
    BARCODE_APP_ID = '50969094'
    BASE_URL = 'https://api.edamam.com/api/food-database/v2/parser'

    /**
     * Returns relevant information about the item given a barcode
     * @param {string} barcode barcode from an item
     * @returns {Promise<FoodItem>} A food item that corresponds to the barcode
     */
    async getDataFromBarcode(barcode) {
        const requestUrl = this.__createRequestURL(barcode)
        try {
            let results = await axios.get(requestUrl, { validateStatus: false })
            let needsRetry = true
            let error = null

            while (needsRetry) {
                switch(results.status) {
                    // Not found
                    case (404):
                        error = new Error('Bad Barcode')
                        needsRetry = false
                        break
                    // Not Authenticated
                    case(403):
                        error = new Error('Bad API Key')
                        needsRetry = false
                        break
                    // Ok
                    case(200):
                        needsRetry = false
                        break
                    // Too Many Requests
                    case(429):
                        needsRetry = true
                        // Wait 5 seconds then send request again
                        await (new Promise(resolve => setTimeout(resolve, 5000)))
                        // Retry the request
                        results = await axios.get(requestUrl, { validateStatus: false })
                        break
                    default:
                        error = new Error(`Unhandled Error Code: ${results.status}`)
                        needsRetry = false
                        break
                }
            }
            
            if (error !== null) {
                logError(error)
                throw error
            }
    
            return this.__parseResponseToItem(results.data)
        } catch (err) {
            logError(err)
            throw err
        }
    }

    __parseResponseToItem(resultsData) {
        const { label, image } = resultsData.hints[0].food

        const foodItem = new FoodItem(label, image, '0')
        return foodItem
    }

    __createRequestURL(barcode) {
        return `${this.BASE_URL}?upc=${barcode}&app_id=${this.BARCODE_APP_ID}&app_key=${this.BARCODE_API_KEY}`
    }
}