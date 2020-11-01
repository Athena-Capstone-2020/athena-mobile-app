import React, { useState } from 'react';
import {
    Dimensions, Image, StyleSheet,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import { Box, ButtonAddToContainer, Button, ButtonMinus, ButtonPlus, IconButton, Text } from '../../components/index';
import { RadioButton } from 'react-native-paper';
import { withContainerService } from '../../services';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen: {
        width: windowWidth,
        height: windowHeight,
    },
    container: {
        marginTop: 55,
        marginLeft: 32,
        flexDirection: "row",
    },
    headerContianer: {
        width: 'auto',
        height: 'auto',
    },
    header: {
        marginLeft: 139,
    },
    backButton: {
        marginLeft: -270,
        marginTop: -13,
        position: "absolute"
    },
    imageContainer: {
        width: windowWidth - 64,
        height: 206,
        alignSelf: "center",
        marginTop: 25
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },
    descriptionContainer: {
        width: windowWidth - 64,
        height: "auto",
        alignSelf: "center"
    },
    name: {
        width: windowWidth - 64,
        height: 110
    },
    countContainer: {
        flexDirection: "row",
        marginTop: 15
    },
    minusButton: {
    },
    count: {
        marginTop: 5,
        marginLeft: 6
    },
    plusButton: {
        marginLeft: 5
    },
    description: {

    },
    addToContainer: {

        marginTop: 230,
        alignSelf: "center",

    },
    centeredBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalBox: {
        marginTop: 340,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: windowHeight / 2.5,
        width: (windowWidth - 64)
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    notSelected: {
        backgroundColor: "#F194FF",
        opacity: .5,
        marginTop: 15,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    selected: {
        backgroundColor: "#F194FF",
        marginTop: 15,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    pushToContainer: {
        marginTop: 100
    }
})

const picture = {
    src: require('../../../assets/pancakes.png')
}

const ItemDescription = ({ navigation }) => {

    const [count, setcount] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [container, setContainer] = useState()
    const [selected, setSelected] = useState('')
    const { containerService } = withContainerService();

    async function getContainers(id) {
        const response = await containerService.getContainerById(id)
        setContainer(response)
        console.log(container)
    }

    async function addItemToContainer(ID, item) {
        const response = await containerService.addFoodItemToContainer(id, item)
        console.log(response)
    }

    return (
        <>
            <Box style={[styles.screen, modalVisible ? styles.darken : ""]}>
                <Box style={styles.container}>
                    <Box style={styles.headerContianer}>
                        <Text variant="header" style={styles.header}>Add Item</Text>
                        <IconButton style={styles.backButton} variant="backButton" onPress={() => navigation.goBack()} />
                    </Box>
                </Box>
                <Box style={styles.imageContainer}>
                    <Image
                        source={picture.src}
                        style={styles.image}
                    />
                </Box>
                <Box style={styles.descriptionContainer}>
                    <Box style={styles.name}>
                        <Text variant="itemDescriptionTitle">Aunt Jemima </Text>
                        <Text variant="itemDescriptionTitle">Complete Pancake </Text>
                        <Text variant="itemDescriptionTitle">Mix Buttermilk</Text>
                    </Box>
                    <Box style={styles.countContainer}>
                        <ButtonMinus style={styles.minusButton} onPress={() => setcount(count - 1)} />
                        <Box style={styles.count}>
                            <Text variant="input">{count}</Text>
                        </Box>
                        <ButtonPlus style={styles.plusButton} onPress={() => setcount(count + 1)} />
                    </Box>
                    <Text style={{ marginTop: 10 }} variant="barcodeInstructions">Complete Pancake Mix Buttermilk Complete Pancake Mix Buttermilk.</Text>
                </Box>
                <ButtonAddToContainer style={styles.addToContainer} onPress={() => {
                    setModalVisible(true), getContainers("CONTAINER_DEMO"), setSelected('')
                }} />
            </Box>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
                style={styles.modal}
            >
                <Box style={styles.centeredBox}>
                    <Box style={styles.modalBox}>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                        <Text style={styles.modalText} variant="itemDescriptionTitle">Pick a Container</Text>
                        <TouchableHighlight
                            style={selected ? styles.selected : styles.notSelected}
                            onPress={() => {
                                if (selected) {
                                    setSelected('')
                                } else {
                                    setSelected(container)
                                }
                            }
                            }
                        >
                            <Text variant="recentSearchesTitle">{container ? container.name : ""}</Text>
                        </TouchableHighlight>
                        <Button label="Add To Container" style={styles.pushToContainer}/>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ItemDescription;
