import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { flashIcon, lightBulbIcon } from '~/constants/IconSource';
import { actToggleFlashWord } from '~/redux/actions/practiceAction';
import { RootState } from '~/redux/reducers/rootReducer';
import { TabPracticeParamList, WordType } from '~/types';
import { Ripple, Text, View } from '../../Themed';

type Props = {
  word: WordType;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWordItem = memo(({ word, navigation }: Props) => {
  const { name_word, pronounce_word, mean_word, count_study, difficult_study } = word;
  const { visibleMean, visiblePronounce } = useSelector((state: RootState) => state.common);

  const dispatch = useDispatch();
  const handleFlashWord = () => dispatch(actToggleFlashWord(word));

  return (
    <View style={styles.container}>
      <View style={styles.word}>
        <View style={styles.wordLeft}>
          <Image style={styles.flash} source={lightBulbIcon[count_study || 0]} />
        </View>
        <View style={styles.wordCenter}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TabPracticeWordDetails', { word })}
            >
              <Text weight={700} style={styles.wordName}>
                {name_word}
              </Text>
            </TouchableOpacity>
            {visiblePronounce && (
              <Text weight={600} style={styles.wordSpelling}>
                {' '}
                {pronounce_word}
              </Text>
            )}
            <Ripple
              style={{ padding: 3 }}
              onPress={() => Speech.speak(name_word || '', { language: 'en' })}
            >
              <MaterialIcons name="volume-up" size={16} color="black" />
            </Ripple>
          </View>
          {visibleMean && <Text style={styles.wordMean}>{mean_word}</Text>}
        </View>
        <View style={styles.wordRight}>
          <Ripple style={styles.icon} onPress={handleFlashWord}>
            <Image style={styles.flash} source={flashIcon[difficult_study || 0]} />
          </Ripple>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
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
    flex: 2,
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
  },
  flash: {
    width: 25,
    height: 25,
  },
  icon: {
    padding: 10,
  },
});

export default TabPracticeWordItem;
