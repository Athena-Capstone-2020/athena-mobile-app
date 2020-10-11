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

export const Home = () => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
}

export default Home;