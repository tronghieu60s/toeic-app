import React, { memo } from 'react';
import tailwind from 'tailwind-rn';
import { Text, View } from '~/src/components/Themed';
import SoundButton from '~/src/components/UI/SoundButton';
import { WordType } from '~/types';

type Props = {
  word: WordType;
};

const StudyWord = memo(({ word }: Props) => {
  const { name_word, mean_word, explain_word } = word;

  return (
    <View style={tailwind('w-full h-full flex-1')}>
      <View colorLight style={tailwind('h-1/3 justify-around items-center')}>
        <SoundButton autoPlay word={word} />
        <Text weight={700} style={tailwind('text-xl')}>
          {name_word}
        </Text>
      </View>
      <View style={tailwind('w-full justify-center items-center mt-5 px-8')}>
        <View style={tailwind('items-center')}>
          <Text weight={700} style={{ color: '#9d9d9d' }}>
            VIETNAMESE
          </Text>
          <Text weight={700} style={tailwind('text-base text-center mt-1')}>
            {mean_word}
          </Text>
        </View>
        <View style={tailwind('items-center mt-7')}>
          <Text weight={700} style={{ color: '#9d9d9d' }}>
            GIẢI THÍCH
          </Text>
          <Text style={tailwind('text-base mt-1 text-center')}>{explain_word}</Text>
        </View>
      </View>
    </View>
  );
});

export default StudyWord;
