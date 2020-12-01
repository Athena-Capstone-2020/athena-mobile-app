import React, { useState } from 'react';
import {
    Dimensions, Image, StyleSheet,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import { Box, ButtonAddToContainer, Button, ButtonMinus, ButtonPlus, IconButton, Text, FoodItem } from '../../components/index';
import { withContainerService, withHouseholdService } from '../../services';
import * as Models from '../../models'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useUserContext } from '../../global/user-context/useUserContext'

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
        width: 200,
        height: 200,
        alignSelf: "center",
        marginTop: 25,
        // backgroundColor: "blue"
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
        marginTop: 15
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
        marginTop: 10
    },
    pushToContainerNotSelected: {
        marginTop: 20,
        opacity: .3
    }
})

const picture = {
    src: require('../../../assets/pancakes.png')
}

const ItemDescription = ({ route, navigation }) => {

    const { searchedItem } = route.params;

    const { state } = useUserContext()

    const [count, setcount] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [containers, setContainers] = useState()
    const [selected, setSelected] = useState('')
    const { containerService } = withContainerService();
    const { householdService } = withHouseholdService()

    async function getContainers() {
        if (state.household) {
            await householdService.getContainersForHousehold(state.household.id).then(res => setContainers(res))
        }
    }

    async function addItemToContainer(containerID, item) {
        if (containerID) {
            const foodItem = new Models.FoodItem(item.name, item.photoURI, count, item.description, new Date(), item.description)
            await containerService.addFoodItemToContainer(foodItem, containerID).then(res => console.log(res))
        }
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
                        source={{ uri: searchedItem.photoURI }}
                        style={styles.image}
                    />
                </Box>
                <Box style={styles.descriptionContainer}>
                    <Box style={styles.name}>
                        <Text variant="itemDescriptionTitle">{searchedItem.name}</Text>
                    </Box>
                    <Box style={styles.countContainer}>
                        <ButtonMinus style={styles.minusButton} onPress={() => setcount(count - 1)} />
                        <Box style={styles.count}>
                            <Text variant="input">{count}</Text>
                        </Box>
                        <ButtonPlus style={styles.plusButton} onPress={() => setcount(count + 1)} />
                    </Box>
                    <Text style={{ marginTop: 20 }} variant="barcodeInstructions">{searchedItem.description}</Text>
                </Box>
                <ButtonAddToContainer style={styles.addToContainer} onPress={() => {
                    getContainers(), setModalVisible(true), setSelected('')
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
                        <Text style={styles.modalText} variant="itemDescriptionTitle">Pick a Container</Text>
                        {containers && containers.map((container, key) => {
                            return (

                                <TouchableHighlight
                                    key={key}
                                    style={selected == container.id ? styles.selected : styles.notSelected}
                                    onPress={() => {
                                        if (selected) {
                                            setSelected('')
                                        } else {
                                            setSelected(container.id)
                                        }
                                    }
                                    }
                                >
                                    <Text variant="recentSearchesTitle">{container ? container.name : ""}</Text>
                                </TouchableHighlight>)
                        })}
                        {
                            selected ? <Button label="Add To Container" style={styles.pushToContainer} onPress={() => { setModalVisible(!modalVisible), addItemToContainer(selected, searchedItem), navigation.navigate('AddItemSearch') }} /> :
                                <Button label="Add To Container" style={styles.pushToContainerNotSelected} onPress={() => { setModalVisible(!modalVisible), navigation.navigate('AddItemSearch') }} />
                        }
                        <Button style={{ width: 50, height: 30, borderRadius: 15, marginTop: 23 }} label="Close " onPress={() => { setModalVisible(false) }} />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ItemDescription;
