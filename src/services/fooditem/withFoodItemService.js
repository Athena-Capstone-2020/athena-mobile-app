import React, {useContext} from 'react'
import {FoodItemServiceContext} from './FoodItemServiceProvider'

export function withFoodItemService() {
    const ctx = useContext(FoodItemServiceContext)

    if(!ctx) throw new Error('No context found')

    return ctx
}