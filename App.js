import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HouseholdService, HouseholdServiceProvider } from './src/services'

export default function App() {
  const householdService = new HouseholdService()

  return (
    <HouseholdServiceProvider householdService={householdService}>
      <View style={styles.container}>
        <Text>Athena App!</Text>
        <StatusBar style="auto" />
      </View>
    </HouseholdServiceProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
