import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../../styles/globalStyles';

export default function Chat() {
  return (
    <View style={localStyles.container}>
      <Text>Página Chat.</Text>
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
