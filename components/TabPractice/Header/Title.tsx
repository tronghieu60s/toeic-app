import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '~/constants/Colors';
import useColorScheme from '~/hooks/useColorScheme';
import { Text, View } from '~/components/Themed';

export default function TabPracticeHeaderTitle(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flexDirection: 'row' }}>
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
