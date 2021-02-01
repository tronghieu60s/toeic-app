import React from 'react';
import { StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import { Text, View } from '~/src/components/Themed';
import Colors from '~/src/constants/Colors';
import useColorScheme from '~/src/hooks/useColorScheme';

export default function TabPracticeHeaderTitle(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <View style={tailwind('flex-row items-center')}>
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
  text: { ...tailwind('text-lg tracking-wide ml-1') },
});
