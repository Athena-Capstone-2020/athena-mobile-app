import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useUserContext } from '../../global/user-context/useUserContext';
import ExpireCard from './ExpireCard';
import { Text, Box } from '../../components/Theme'
import { withContainerService, withHouseholdService } from '../../services';
import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
    },
    innerContainer: {
        alignItems: "flex-start",
        marginHorizontal: 30
    }
});

export const Home = () => {
    const { state: userCtx, actions} = useUserContext()

    const [expireSoonFoodItems, setExpireSoonFoodItems] = useState([])
    const { householdService } = withHouseholdService()
    const navigation = useNavigation()

    useEffect(() => {
        displayExpireSoon()
    }, [householdService, navigation])

    async function displayExpireSoon() {
        console.log(userCtx)
        const results = await householdService.getContainersForHousehold('2TfHPkYOMDAofThS0N8h') // Reyes Household
        console.log(results)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Box style={styles.innerContainer}>
            <Text variant='superHeader' style={{ marginVertical: 40 }}>Reyes Household</Text>
            <Text variant='header'>Expiring Soon</Text>
            <ExpireCard title='Banana' />
            {/* <Text variant='header' style={{ marginTop: 30 }}>Recipies</Text>
            <ExpireCard/> */}
            </Box>
        </SafeAreaView>
    );
}

export default Home;