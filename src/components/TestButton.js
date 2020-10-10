import { Text, View } from 'react-native'
import { withHouseholdService } from '../services'

function TestButton(props) {
    const { householdService } = withHouseholdService()

    householdService.__HealthCheck()

    return (
        <View>
            <Text>Button Goes Here</Text>
        </View>
    )
}