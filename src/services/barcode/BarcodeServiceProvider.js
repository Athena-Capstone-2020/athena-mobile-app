import React, {createContext} from 'react'

export const BarcodeServiceContext = createContext(null)

export function BarcodeServiceProvider(props){
    return (
        <BarcodeServiceContext.Provider value={{ barcodeService: props.barcodeService }}>
            {props.children}
        </BarcodeServiceContext.Provider>
    )
}