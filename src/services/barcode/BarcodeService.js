import { default as axios } from 'axios'
import { FoodItem } from '../../models'
import { logError } from '../../logger/Logger'

export class BarcodeService {
    constructor(barcodeApiKey){
        this.BARCODE_API_KEY = barcodeApiKey
    }

    BARCODE_API_KEY = null
    BASE_URL = 'https://api.barcodelookup.com/v2/products'

    /**
     * Returns relevant information about the item given a barcode
     * @param {string} barcode barcode from an item
     * @returns {Promise<FoodItem>} A food item that corresponds to the barcode
     */
    async getDataFromBarcode(barcode) {
        const requestUrl = this.__createRequestURL(barcode)
        try {
            const results = await axios.get(requestUrl, { validateStatus: false })

            let error = null
            switch(results.status) {
                case (404):
                    error = new Error('Bad Barcode')
                    break
                case(403):
                    error = new Error('Bad API Key')
                    break
                case(200):
                    break
                default:
                    error = new Error(`Unhandled Error Code: ${results.status}`)
                    break
            }
            // TODO: handle Too Many Requests
            
            if (error !== null) {
                logError(error)
                throw error
            }
    
            const { product_name : productName } = results.data.products[0]
            const photoUri = results.data.products[0].images[0]
    
            const foodItem = new FoodItem(productName, photoUri, '0')
            return foodItem
        } catch (err) {
            logError(err)
            throw err
        }
    }

    __createRequestURL(barcode) {
        return `${this.BASE_URL}?barcode=${barcode}&formatted=y&key=${this.BARCODE_API_KEY}&geo=us`
    }
}