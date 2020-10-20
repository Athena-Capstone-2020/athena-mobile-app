import React from 'react'
import { ContainerButton } from '../../components/index'

const users = ["Jeremiah", "Elias", "Blaine"];

const Container = () => {
    return (
        users.map((u, index) => {
            return <ContainerButton label={u} key={index} onPress={() => { }} />
        })
    )
}

export default Container;