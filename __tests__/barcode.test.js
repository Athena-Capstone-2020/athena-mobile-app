import { BarcodeService } from '../src/services/barcode'
import { initFirebase } from '../src/firebase/config'
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

test('should get fooditem with mock barcode scan', async () =>  {
    const barcodeService = setup()

    const barcode = '0380001817191'
    const foodObj = await barcodeService.mockGetDataFromBarcodeUPC(barcode)
    expect(foodObj).toBeDefined()
})

test('should be able to query food', async () => {
    const barcodeService = setup()

    const testInput1 = 'banana'
    const res1 = await barcodeService.queryFoodByName(testInput1)
    expect(res1.length).toBe(1)

    const testInput2 = 'CHicKeN'
    const res2 = await barcodeService.queryFoodByName(testInput2)
    expect(res2.length).toBe(1)

    const testInput3 = 'Chick'
    const res3 = await barcodeService.queryFoodByName(testInput3)
    expect(res3.length).toBe(0)
})

/**
 * @returns {BarcodeService}
 */
function setup() {
    initFirebase()
    const barcodeApiKey = process.env.BARCODE_LOOKUP_API_KEY
    const barcodeService = new BarcodeService(barcodeApiKey)

    return barcodeService
}