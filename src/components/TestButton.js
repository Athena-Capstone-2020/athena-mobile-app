import { Text, View } from 'react-native'
import React from "react";
import { withHouseholdService, withGroceryListService, withContainerService, withFoodItemService } from '../services'

export function TestButton(props) {
    const { householdService } = withHouseholdService()
    const { groceryListService } = withGroceryListService()
    const { containerService } = withContainerService()
    const { foodItemService } = withFoodItemService()

    householdService.__HealthCheck()
    groceryListService.__HealthCheck()
    containerService.__HealthCheck()
    foodItemService.__HealthCheck()

    return (
        <View>
            <Text>Button Goes Here</Text>
        </View>
    )
}