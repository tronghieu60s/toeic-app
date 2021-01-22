import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '~/components/Themed';
import SoundButton from '~/components/UI/SoundButton';
import { TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabPracticeWordDetails = memo(({ route }: Props) => {
  const { name_word, mean_word, explain_word, pronounce_word } = route.params.word;

  return (
    <View style={styles.container}>
      <SoundButton autoPlay size={80} word={route.params.word} />
      <Text weight={700} style={styles.name}>
        {name_word}
      </Text>
      <Text weight={600} style={styles.pronounce}>
        {pronounce_word}
      </Text>
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
    marginTop: 20,
  },
});

export default TabPracticeWordDetails;
