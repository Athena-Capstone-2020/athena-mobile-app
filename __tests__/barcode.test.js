import { BarcodeService } from '../src/services/barcode'

test('should return a proper item with a valid barcode', async () => {
    const barcodeService = setup()

    const barcode = '9780140157376'

    const returnedProduct = await barcodeService.getDataFromBarcode(barcode)

    expect(returnedProduct.name).toBe('Haroun and the Sea of Stories')
    expect(returnedProduct.photoURI).toBe('https://images.barcodelookup.com/134/1342375-1.jpg')
})

test('should return an error with an invalid barcode', () => {
    const barcodeService = setup()

    const barcode = '0000000000000'

    expect(() => {
        barcodeService.getDataFromBarcode(barcode)
    }).toThrow('Bad Barcode')
})

/**
 * @returns {BarcodeService}
 */
function setup() {
    const barcodeApiKey = process.env.BARCODE_API_KEY
    const barcodeService = new BarcodeService(barcodeApiKey)

    return barcodeService
}