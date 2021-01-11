import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

export default function Center({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 13 }}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
