import React, { useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import { IconButton, Input, Box, Text, Button } from '../../components/index'
import { withBarcodeService } from '../../services';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {

        marginTop: 55,
        marginLeft: 32,
        flexDirection: "row"
    },
    headerContianer: {
        width: 'auto',
        height: 'auto',
        // backgroundColor: 'pink'
    },
    header: {
        marginLeft: 123,
    },
    backButton: {
        marginLeft: -270,
        marginTop: -13,
        position: "absolute"
    },
    enterBarcode: {
        width: windowWidth - 64,
        height: 100,
        // backgroundColor: "green",
        position: "absolute",
        marginLeft: windowWidth - (windowWidth - 32),
        marginTop: 150
    },
    instructions: {
        marginTop: 8
    },
    input: {
        marginTop: 19
    },
    enterButton: {
        marginTop: 28,
        alignSelf: "center"
    }
})


const BarcodeManual = ({ navigation }) => {

    const [entered, setEntered] = useState(false);
    const { barcodeService } = withBarcodeService()

    const handleBarCodeEntered = async ({ data, navigation }) => {
        setEntered(true);
        const response = await barcodeService.getDataFromBarcode(data)
        console.log(response)
        console.log(navigation)
    };

    return (
        <>
            <Box style={styles.container}>
                <Box style={styles.headerContianer}>
                    <Text variant="header" style={styles.header}>Enter Barcode</Text>
                    <IconButton style={styles.backButton} variant="backButton" onPress={() => navigation.goBack()} />
                </Box>
            </Box>
            <Box style={styles.enterBarcode}>
                <Text variant="boldText">Enter Barcode</Text>
                <Text variant="barcodeInstructions" style={styles.instructions}>Enter the 12-digit UPC on the back of </Text>
                <Text variant="barcodeInstructions">the food item</Text>
                <Input style={styles.input} placeholder="12-digit UPC" />
                <Button style={styles.enterButton} label='Enter' onPress={entered ? undefined : handleBarCodeEntered} />
            </Box>
        </>
    )
}

export default BarcodeManual;
