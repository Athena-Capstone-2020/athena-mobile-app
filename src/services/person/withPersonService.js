import React, { useContext } from 'react'

export function withPersonService() {
    const ctx = useContext(PersonServiceContext)

    if (!ctx) throw new Error('No context found')

    return ctx
}