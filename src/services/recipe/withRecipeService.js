import React, {useContext} from 'react'
import {RecipeServiceContext} from './RecipeServiceProvider'

export function withRecipeService() {
    const ctx = useContext(RecipeServiceContext)

    if(!ctx) throw new Error('No context found')

    return ctx
}