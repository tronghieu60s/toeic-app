import React, { memo } from 'react';
import { Text, View } from '~/src/components/Themed';
import SoundButton from '~/src/components/UI/SoundButton';
import tailwind from '~/tailwind';
import { WordType } from '~/types';

type Props = {
  word: WordType;
};

const StudyWord = memo(({ word }: Props) => {
  const { name_word, mean_word, explain_word } = word;

  return (
    <View style={tailwind('w-full h-full flex-1 py-3')}>
      <View style={tailwind('h-1/3 justify-between items-center py-3')}>
        <SoundButton autoPlay word={word} />
        <Text weight={700} style={tailwind('text-xl mt-3 text-center')}>
          {name_word}
        </Text>
      </View>
      <View style={tailwind('w-full justify-center items-center mt-5 px-8')}>
        <View style={tailwind('items-center')}>
          <Text weight={700} style={{ color: '#9d9d9d', fontSize: 12 }}>
            VIETNAMESE
          </Text>
          <Text weight={700} style={tailwind('text-base text-center mt-1')}>
            {mean_word}
          </Text>
        </View>
        <View style={tailwind('items-center mt-7')}>
          <Text weight={700} style={{ color: '#9d9d9d', fontSize: 12 }}>
            GIẢI THÍCH
          </Text>
          <Text style={tailwind('text-base mt-1 text-center')}>{explain_word}</Text>
        </View>
      </View>
    </View>
  );
});

export default StudyWord;
