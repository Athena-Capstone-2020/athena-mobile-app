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

const User = () => {
    return (
        <View style={styles.container}>
            <Text>User Screen</Text>
        </View>
    )
}

export default User;