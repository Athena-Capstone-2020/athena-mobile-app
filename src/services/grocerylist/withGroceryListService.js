import React, {useContext} from 'react'
import {GroceryListServiceContext} from './GroceryListServiceProvider'

export function withGroceryListService(){
    const ctx = useContext(GroceryListServiceContext)

    if (!ctx) throw new Error('No context found')

    return ctx
}