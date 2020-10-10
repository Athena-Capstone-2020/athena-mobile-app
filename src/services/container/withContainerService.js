import React, {useContext} from 'react'
import {ContainerServiceContext} from './ContainerServiceProvider'

export function withContainerService() {
    const ctx = useContext(ContainerServiceContext)

    if(!ctx) throw new Error('No context found')

    return ctx
}