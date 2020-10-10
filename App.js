import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from './Provider';
import { TestButton } from './src/components/TestButton'


export default function App() {
  return (
      <Provider>
        <View style={styles.container}>
          <Text>Athena App!</Text>
          <StatusBar style="auto" />
          <TestButton />
        </View>
      </Provider>
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
