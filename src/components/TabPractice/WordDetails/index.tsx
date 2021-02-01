import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import tailwind from 'tailwind-rn';
import { Text, View } from '~/src/components/Themed';
import SoundButton from '~/src/components/UI/SoundButton';
import { TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabPracticeWordDetails = memo((props: Props) => {
  const { route } = props;
  const { name_word, mean_word, explain_word, pronounce_word } = route.params.word;

  return (
    <View style={tailwind('flex-1 items-center py-28')}>
      <View style={tailwind('w-9/12 items-center')}>
        <SoundButton autoPlay size={80} word={route.params.word} />
        <Text weight={700} style={tailwind('text-xl')}>
          {name_word}
        </Text>
        <Text weight={600} style={{ color: '#5e72e4' }}>
          {pronounce_word}
        </Text>
        <Text weight={400} style={tailwind('text-center mt-4')}>
          {explain_word}
        </Text>
        <Text weight={700} style={tailwind('text-center mt-4')}>
          {mean_word}
        </Text>
      </View>
    </View>
  );
});

export default TabPracticeWordDetails;
