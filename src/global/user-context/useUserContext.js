import { useContext } from 'react'
import { UserContext } from './UserContextProvider'

export function useUserContext() {
    const ctx = useContext(UserContext)

    if(!ctx) throw new Error('No context found')

    return ctx
}