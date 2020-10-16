import { Text, View } from 'react-native'
import React from "react";
import { withHouseholdService, withGroceryListService, withContainerService } from '../services'

export function TestButton(props) {
    const { householdService } = withHouseholdService()
    const { groceryListService } = withGroceryListService()
    const { containerService } = withContainerService()

    householdService.__HealthCheck()
    groceryListService.__HealthCheck()
    containerService.__HealthCheck()

    return (
        <View>
            <Text>Button Goes Here</Text>
        </View>
    )
}