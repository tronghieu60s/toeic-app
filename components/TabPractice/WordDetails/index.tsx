import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Ripple, Text, View } from '~/components/Themed';
import { TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabPracticeWordDetails = memo(({ route }: Props) => {
  const { name_word, mean_word, explain_word, pronounce_word } = route.params.word;

  return (
    <View style={styles.container}>
      <Text weight={700} style={styles.name}>
        {name_word}
      </Text>
      <Text weight={600} style={styles.pronounce}>
        {pronounce_word}
      </Text>
      <Ripple
        style={{ padding: 3 }}
        onPress={() => Speech.speak(name_word, { language: 'en' })}
      >
        <MaterialIcons name="volume-up" size={16} color="black" />
      </Ripple>
      <Text weight={400} style={styles.mean}>
        {explain_word}
      </Text>
      <Text weight={700} style={[styles.mean, { marginTop: 20 }]}>
        {mean_word}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 70,
  },
  name: {
    fontSize: 20,
  },
  pronounce: {
    color: '#5e72e4',
  },
  mean: {
    textAlign: 'center',
  },
});

export default TabPracticeWordDetails;
