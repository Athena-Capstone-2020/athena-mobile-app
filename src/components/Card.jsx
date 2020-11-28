import React from 'react'
import { Image } from 'react-native'
import { Box, Text } from './Theme'

/**
 * @param {{ imageUri: string, bottomContent: React.Component, width: string | number, height: string | number }} props 
 */
export function Card(props) {
    const style = {
        container: {
            backgroundColor: 'white',
            borderRadius: 10,
            width: props.width || 150,
            minHeight: props.height || 75,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
        },
        bottomContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    return (
        <Box style={[style.container, props.cardStyle ]} {...props}>
            <Image source={{ uri: props.imageUri }} style={{width: '100%', minHeight: 100 }} resizeMode={'center'} />
            <Box style={style.bottomContainer}>
            {props.bottomContent}
            </Box>
        </Box>
    )
}