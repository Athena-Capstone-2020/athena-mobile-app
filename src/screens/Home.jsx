import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useUserContext } from '../global/user-context/useUserContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export const Home = () => {
    const ctx = useUserContext()
    console.log(ctx)
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
}

export default Home;