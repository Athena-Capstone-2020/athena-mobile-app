import { Text, View } from 'react-native'
import React from "react";
import { withHouseholdService, withGroceryListService } from '../services'

export function TestButton(props) {
    const { householdService } = withHouseholdService()
    const { groceryListService } = withGroceryListService()

    householdService.__HealthCheck()
    groceryListService.__HealthCheck()

    return (
        <View>
            <Text>Button Goes Here</Text>
        </View>
    )
}