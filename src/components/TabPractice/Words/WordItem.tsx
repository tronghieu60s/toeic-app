import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import Config from '~/src/constants/Config';
import { flashIcon, lightBulbIcon } from '~/src/constants/IconSource';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { WordType } from '~/types';
import { Ripple, Text, View } from '../../Themed';

const { count_max } = Config.study;

type Props = {
  word: WordType;
  handleFlashWord?: (word: WordType) => void;
  handleDetailsWord?: (word: WordType) => void;
};

export default function WordItem(props: Props): JSX.Element {
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

  const iconBulb = lightBulbIcon[count_study >= count_max ? 1 : 0];
  const iconFlash = flashIcon[difficult_study > 0 ? 1 : 0];
  const explainWord = `${explain_word.slice(0, 50)}${explain_word.length > 50 ? '...' : ''}`;

  return (
    <View style={tailwind('flex-auto flex-row rounded-lg mb-2 px-3')}>
      <Ripple
        disabled={handleDetailsWord === null}
        style={tailwind('w-11/12 flex-auto flex-row')}
        onPress={() => handleDetailsWord && handleDetailsWord(word)}
      >
        <View style={tailwind('w-1/12 justify-center items-center px-4')}>
          <Image style={tailwind('w-6 h-6')} source={iconBulb} />
        </View>
        <View style={tailwind('w-10/12 justify-center ml-3 py-4')}>
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
      <View style={tailwind('w-1/12 flex-auto justify-center items-center bg-transparent')}>
        {handleFlashWord && (
          <Ripple style={{ padding: 8 }} onPress={() => handleFlashWord(word)}>
            <Image style={{ width: 17, height: 17 }} source={iconFlash} />
          </Ripple>
        )}
      </View>
    </View>
  );
}

WordItem.defaultProps = {
  handleFlashWord: null,
  handleDetailsWord: null,
};
