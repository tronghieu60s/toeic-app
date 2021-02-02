import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { flashIcon, lightBulbIcon } from '~/src/constants/IconSource';
import { RootState } from '~/src/redux/reducers/rootReducer';
import { WordType } from '~/types';
import { Ripple, Text, View } from '../../Themed';

type Props = {
  word: WordType;
  handleFlashWord: () => void;
  handleDetailsWord: () => void;
};

const WordItem = (props: Props) => {
  const { word, handleFlashWord, handleDetailsWord } = props;
  const {
    name_word,
    pronounce_word,
    mean_word,
    explain_word = '',
    count_study = 0,
    difficult_study = 0,
  } = word;

  const common = useSelector((state: RootState) => state.common);
  const { visibleMean, visibleExplain, visiblePronounce } = common;

  const iconBulb = lightBulbIcon[count_study === null ? 0 : count_study];
  const iconFlash = flashIcon[difficult_study > 0 ? 1 : 0];
  const explainWord = `${explain_word.slice(0, 50)}${explain_word.length > 50 ? '...' : ''}`;

  return (
    <View style={tailwind('flex-auto flex-row mb-3 px-3 py-4')}>
      <Ripple style={tailwind('flex-auto flex-row')} onPress={handleDetailsWord}>
        <View style={tailwind('justify-center items-center px-2')}>
          <Image style={tailwind('w-7 h-7')} source={iconBulb} />
        </View>
        <View style={tailwind('justify-center w-10/12 ml-3')}>
          <View style={tailwind('flex-row items-center')}>
            <Text weight={700} style={(tailwind('text-sm'), { color: '#5e72e4' })}>
              {name_word}
            </Text>
            {visiblePronounce && (
              <Text weight={600} style={{ color: '#888' }}>
                {' '}
                {pronounce_word}
              </Text>
            )}
          </View>
          {visibleExplain && <Text weight={300}>{explainWord}</Text>}
          {visibleMean && (
            <Text weight={700} style={tailwind('text-sm')}>
              {mean_word}
            </Text>
          )}
        </View>
      </Ripple>
      <View style={tailwind('flex-auto justify-center items-center')}>
        <Ripple onPress={handleFlashWord}>
          <Image style={tailwind('w-5 h-5')} source={iconFlash} />
        </Ripple>
      </View>
    </View>
  );
};

export default WordItem;
