import React from 'react'
import { useUserContext } from '../global/user-context'
import Onboarding from './onboarding/Onboarding'
import Navbar from './navbar/Navbar'

const Athena = () => {

    const { state } = useUserContext()

    return (
        <>
            { state.user ? <Navbar /> : <Onboarding />}
        </>
    )
}

export default Athena;
