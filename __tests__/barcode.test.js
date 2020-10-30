import { BarcodeService } from '../src/services/barcode'
require('dotenv').config()

test('should return a proper item with a valid barcode', async () => {
    const barcodeService = setup()

    const barcode = '051500720011'

    const returnedProduct = await barcodeService.getDataFromBarcode(barcode)

    expect(returnedProduct.name).toBe('Jif Creamy Peanut Butter')
    expect(returnedProduct.photoURI).toBe('https://www.edamam.com/food-img/420/42006f4d5d603fcfe77cdeccb782229a.jpg')
})

test('should return an error with an invalid barcode', async () => {
    const barcodeService = setup()

    const barcode = '000720011'

    try {
        await barcodeService.getDataFromBarcode(barcode)
        throw new Error('Did not throw Bad Barcode error')
    } catch (err) {
        expect(err).toEqual(new Error('Bad Barcode'))
    }
})

/**
 * @returns {BarcodeService}
 */
function setup() {
    const barcodeApiKey = process.env.BARCODE_LOOKUP_API_KEY
    const barcodeService = new BarcodeService(barcodeApiKey)

    return barcodeService
}