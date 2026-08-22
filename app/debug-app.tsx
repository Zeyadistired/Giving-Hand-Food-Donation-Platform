import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Minimal app component for debugging white screen issues
export default function DebugApp() {
  console.log('DebugApp: Rendering minimal app');
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Debug App - If you see this, React Native is working!</Text>
      <Text style={styles.subtext}>Check console for any errors</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000000',
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
  },
});
