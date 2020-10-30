import { BarcodeService } from '../src/services/barcode'
require('dotenv').config()

test('should return a proper item with a valid barcode', async () => {
    const barcodeService = setup()

    const barcode = '9780140157376'

    const returnedProduct = await barcodeService.getDataFromBarcode(barcode)

    expect(returnedProduct.name).toBe('Haroun and the Sea of Stories')
    expect(returnedProduct.photoURI).toBe('https://images.barcodelookup.com/134/1342375-1.jpg')
})

test('should return an error with an invalid barcode', async () => {
    const barcodeService = setup()

    const barcode = '978014057376'

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