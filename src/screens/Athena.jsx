import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Navbar from './navbar/Navbar'
import Onboarding from './onboarding/Onboarding'
import { useUserContext } from '../global/user-context/useUserContext'

const Athena = () => {

    const { state } = useUserContext()

    return (
        <>
            {state.user ? <Navbar /> : <Onboarding />}
        </>
    )
}

export default Athena;
