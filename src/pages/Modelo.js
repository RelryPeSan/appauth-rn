import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../../styles';

export default function Modelo() {
  return (
    <View style={styles.container}>
      <Text>Página modelo.</Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  }
});
