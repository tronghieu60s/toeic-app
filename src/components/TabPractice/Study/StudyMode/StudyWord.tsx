import React from 'react';
import { Dimensions } from 'react-native';
import { Text, View } from '~/src/components/Themed';
import SoundButton from '~/src/components/UI/SoundButton';
import tailwind from '~/tailwind';
import { WordType } from '~/types';

type Props = {
  word: WordType;
};

const StudyWord = React.memo(({ word }: Props) => {
  const { name_word, mean_word, explain_word } = word;

  return (
    <View style={{ ...tailwind('flex-1 bg-transparent'), width: Dimensions.get('window').width }}>
      <View style={tailwind('py-5 mx-3 my-4 rounded-lg')}>
        <View style={tailwind('justify-between items-center bg-transparent')}>
          <SoundButton size={90} autoPlay word={word} />
          <Text weight={700} style={tailwind('text-xl mt-7 ml-2 text-center')}>
            {name_word}
          </Text>
        </View>
        <View style={tailwind('w-full justify-center items-center mt-5 px-8 bg-transparent')}>
          <View style={tailwind('items-center  bg-transparent')}>
            <Text weight={700} style={{ color: '#9d9d9d', fontSize: 12 }}>
              VIETNAMESE
            </Text>
            <Text weight={700} style={tailwind('text-base text-center mt-1')}>
              {mean_word}
            </Text>
          </View>
          <View style={tailwind('items-center mt-7 bg-transparent')}>
            <Text weight={700} style={{ color: '#9d9d9d', fontSize: 12 }}>
              GIẢI THÍCH
            </Text>
            <Text style={tailwind('text-base mt-1 text-center')}>{explain_word}</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

export default StudyWord;
