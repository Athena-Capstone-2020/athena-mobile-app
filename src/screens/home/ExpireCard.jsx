import React from 'react'
import { Card } from '../../components'
import { Box, Text } from '../../components/Theme'

/**
 * 
 * @param {{ title: string, imageUri: string }} props 
 */
export default function ExpireCard(props) {
    const defaultImage = 'https://i.redd.it/febxrcjqpeb41.jpg'

    return (
        <Card
            imageUri={defaultImage}
            bottomContent={
                <ExpireCardContent {...props} />}
            />
    )
}

function ExpireCardContent(props) {
    const style = {
        title: {
            textAlign: 'center',
            margin: 10
        }
    }

    return (<Text adjustsFontSizeToFit numberOfLines={1} allowFontScaling={true} variant='body' style={style.title}>{props.title}</Text>)
}