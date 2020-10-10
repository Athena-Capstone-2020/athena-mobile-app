import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

const ContainerList = () => {
    return (
        <View style={styles.container}>
            <Text>ContainerList Screen</Text>
        </View>
    )
}

export default ContainerList;