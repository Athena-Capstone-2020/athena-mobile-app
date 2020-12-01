import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { G, Path } from "react-native-svg";
import { Box, ButtonAlt, IconButton, Text } from '../../components/index';
import { withBarcodeService } from '../../services';

const styles = StyleSheet.create({
    container: {
        width: 141.5 + 78,
        height: 43,
        // backgroundColor: "green",
        marginTop: 55,
        marginLeft: 32,
    },
    screenName: {
        marginLeft: 135,
    },
    backButton: {
        marginLeft: -270,
        marginTop: -13,
        position: "absolute"
    },
    infoContainer: {
        width: 278,
        height: 45,
        marginTop: 70,
        alignSelf: "auto",
        marginLeft: 40,
        // backgroundColor: "red"
    },
    info1: {
        textAlign: "auto"
    },
    info2: {
        textAlign: "center"
    },
    barcodeAreaContainer: {
        width: 326,
        height: 201,
        borderRadius: 14,
        backgroundColor: "pink",
        alignSelf: "center",
        marginLeft: 135,
        marginTop: 100,

    },
    icon: {
        position: "absolute",
        zIndex: 1,
        alignSelf: "center",
        marginTop: 15
    },
    camera: {
        width: 326,
        height: 201,
        borderRadius: 14,
    },
    manualButton: {
        alignContent: "center",
        marginLeft: 54,
        marginTop: 240
    }
})

const BarcodeAreaIcon = () => {
    return (
        // 326
        // 201
        <Svg width={273.22} height={167.81} viewBox="0 0 326 201">
            <G
                fill="none"
                stroke="#2aff17"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={2}
                strokeDasharray="0 0"
            >
                <Path d="M42.133 200.001H19.984A18.722 18.722 0 011 181.5v-21.583" />
                <Path
                    data-name="Vector"
                    d="M325 159.917V181.5a18.722 18.722 0 01-18.984 18.5h-22.149M1 41.084V19.5A18.722 18.722 0 0119.984 1h22.149M283.867 1h22.148A18.722 18.722 0 01325 19.5v21.584"
                />
            </G>
        </Svg>
    );
}


const BarcodeScanner = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const { barcodeService } = withBarcodeService()

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true)
        const response = await barcodeService.getDataFromBarcode(data)
        console.log(response)
    };


    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <Box style={styles.container}>
            <IconButton style={styles.backButton} variant="downButton" onPress={() => navigation.goBack()} />
            <Text variant="header" style={styles.screenName}>Scan Food</Text>
            <Box style={styles.infoContainer}>
                <Text variant="barcodeInstructions" style={styles.info1}>Please hold the bar code inside the frame</Text>
                <Text variant="barcodeInstructions" style={styles.info2}>to start scanning</Text>
            </Box>
            <Box style={styles.barcodeAreaContainer}>
                <Box style={styles.icon}>
                    <BarcodeAreaIcon />
                </Box>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{
                        width: 326,
                        height: 201,
                    }}
                />
            </Box>
            <Box style={styles.manualButton}>
                <ButtonAlt variant="buttonAlt" label="Enter Barcode Manually" onPress={() => navigation.navigate('BarcodeManual')} />
            </Box>
        </Box>
    )
}


export default BarcodeScanner;
