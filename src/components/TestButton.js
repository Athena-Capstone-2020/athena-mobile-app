import { Text, View } from 'react-native'
import React from "react";
import { withHouseholdService } from '../services'

export function TestButton(props) {
    const { householdService } = withHouseholdService()

    householdService.__HealthCheck()

    return (
        <View>
            <Text>Button Goes Here</Text>
        </View>
    )
}