import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '~/src/components/Themed';
import Colors from '~/src/constants/Colors';
import useColorScheme from '~/src/hooks/useColorScheme';

export default function TabPracticeHeaderTitle(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text weight={700} style={styles.text}>
        TOEIC
      </Text>
      <Text weight={700} style={[styles.text, { color: Colors[colorScheme].tint }]}>
        Essential Words
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    letterSpacing: 0.7,
    marginLeft: 4,
  },
});
