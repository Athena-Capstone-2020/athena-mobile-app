import React from 'react';
import {
    Alert,
    Modal,
    Text,
    TouchableHighlight
} from 'react-native';
import { Box } from '../../components/index';

const ModalPopup = () => {
    return (
        <Box>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <Box style={styles.centeredBox}>
                    <Box style={styles.modalBox}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default ModalPopup
