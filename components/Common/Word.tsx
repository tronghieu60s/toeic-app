import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { flashIcon, lightBulbIcon } from '~/constants/IconSource';
import { RootState } from '~/redux/reducers/rootReducer';
import { WordType } from '~/types';
import { Ripple, Text, View } from '../Themed';

type Props = {
  word: WordType;
  handleFlashWord: () => void;
  handleDetailsWord: () => void;
};

const CommonWordItem = ({ word, handleFlashWord, handleDetailsWord }: Props) => {
  const { name_word, pronounce_word, mean_word, count_study, difficult_study } = word;
  const { visibleMean, visiblePronounce } = useSelector((state: RootState) => state.common);

  return (
    <View style={styles.container}>
      <View style={styles.word}>
        <Ripple
          rippleCentered={false}
          rippleContainerBorderRadius={0}
          style={styles.ripple}
          onPress={handleDetailsWord}
        >
          <View style={styles.wordLeft}>
            <Image style={styles.flash} source={lightBulbIcon[count_study || 0]} />
          </View>
          <View style={styles.wordCenter}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text weight={700} style={styles.wordName}>
                {name_word}
              </Text>
              {visiblePronounce && (
                <Text weight={600} style={styles.wordSpelling}>
                  {' '}
                  {pronounce_word}
                </Text>
              )}
            </View>
            {visibleMean && <Text style={styles.wordMean}>{mean_word}</Text>}
          </View>
        </Ripple>
        <View style={styles.wordRight}>
          <Ripple style={styles.icon} onPress={handleFlashWord}>
            <Image style={styles.flash} source={flashIcon[difficult_study || 0]} />
          </Ripple>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  ripple: {
    flex: 8,
    flexDirection: 'row',
  },
  word: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  wordLeft: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordCenter: {
    flex: 8,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  wordRight: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordName: {
    color: '#5e72e4',
    fontSize: 16,
  },
  wordSpelling: {
    color: '#888',
  },
  wordMean: {
    fontSize: 14,
    marginTop: 1,
  },
  flash: {
    width: 25,
    height: 25,
  },
  icon: {
    padding: 10,
  },
});

export default CommonWordItem;
