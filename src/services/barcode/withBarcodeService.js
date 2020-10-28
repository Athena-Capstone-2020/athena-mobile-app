import React, {useContext} from 'react'

export function withBarcodeService() {
    const ctx = useContext(BarcodeServiceContext)

    if(!ctx) throw new Error('No context found')

    return ctx
}