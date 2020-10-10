import React, {createContext} from 'react'

export const ContainerServiceContext = createContext(null)

export function ContainerServiceProvider(props){
    return (
        <ContainerServiceContext.Provider value={{ containerService: props.containerService }}>
            {props.children}
        </ContainerServiceContext.Provider>
    )
}