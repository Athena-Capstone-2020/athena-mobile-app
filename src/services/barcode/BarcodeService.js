import { default as axios } from 'axios'
import { FoodItem } from '../../models'

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
        const results = await axios.get(requestUrl, { validateStatus: false })
        

        // TODO: handle Too Many Requests
        console.log(results.status)
        if (results.status === 404) {
            const errorMessage = `Could not find item with barcode: ${barcode}`
            console.error(errorMessage)
            throw new Error('Bad Barcode')
        }

        const { product_name : productName } = results.data.products[0]
        const photoUri = results.data.products[0].images[0]

        const foodItem = new FoodItem(productName, photoUri, '0')
        return foodItem
    }

    __createRequestURL(barcode) {
        return `${this.BASE_URL}?barcode=${barcode}&formatted=y&key=${this.BARCODE_API_KEY}&geo=us`
    }
}