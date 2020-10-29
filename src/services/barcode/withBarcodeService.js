import React, {useContext} from 'react'
import { BarcodeService } from './BarcodeService'
import { BarcodeServiceContext } from './BarcodeServiceProvider'

/**
 * @returns {{ barcodeService: BarcodeService}}
 */
export function withBarcodeService() {
    const ctx = useContext(BarcodeServiceContext)

    if(!ctx) throw new Error('No context found')

    return ctx
}