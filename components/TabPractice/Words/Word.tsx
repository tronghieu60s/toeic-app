import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/reducers/rootReducer';
import { TabPracticeParamList, WordType } from '~/types';
import { Text, View } from '../../Themed';

type Props = {
  word: WordType;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWordItem = memo(({ word, navigation }: Props) => {
  const { name, pronounce, mean } = word;
  const { visibleMean, visiblePronounce } = useSelector((state: RootState) => state.common);

  return (
    <View style={styles.container}>
      <View style={styles.word}>
        <View style={styles.wordLeft}>
          <Image style={styles.flash} source={require('~/assets/images/lightbulb-0.png')} />
        </View>
        <View style={styles.wordCenter}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TabPracticeWordDetails', { word })}
            >
              <Text weight={700} style={styles.wordName}>
                {name}
              </Text>
            </TouchableOpacity>
            {visiblePronounce && (
              <Text weight={600} style={styles.wordSpelling}>
                {' '}
                {pronounce}
              </Text>
            )}
            <TouchableNativeFeedback
              style={{ padding: 3 }}
              onPress={() => Speech.speak(name, { language: 'en' })}
            >
              <MaterialIcons name="volume-up" size={16} color="black" />
            </TouchableNativeFeedback>
          </View>
          {visibleMean && <Text style={styles.wordMean}>{mean}</Text>}
        </View>
        <View style={styles.wordRight}>
          <Ripple rippleCentered rippleContainerBorderRadius={50} style={styles.icon}>
            <Image style={styles.flash} source={require('~/assets/images/flash.png')} />
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
