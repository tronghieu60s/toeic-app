import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { useDispatch } from 'react-redux';
import { WordType } from '~/types';
import { Text, View } from '../Themed';

type Props = {
  word: WordType;
};

const Words = memo(({ word }: Props) => {
  const { name, pronounce, explain, translate } = word;
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.word}>
        <View style={styles.wordLeft}>
          <Image style={styles.flash} source={require('~/assets/images/lightbulb-1.png')} />
        </View>
        <View style={styles.wordCenter}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text weight={700} style={styles.wordName}>
              {name}
            </Text>
            <Text weight={600} style={styles.wordSpelling}>
              {' '}
              {pronounce}
            </Text>
            <Ripple
              rippleCentered
              rippleContainerBorderRadius={50}
              style={{ padding: 3 }}
              onPress={() => Speech.speak(name, { language: 'en-US' })}
            >
              <MaterialIcons name="volume-up" size={16} color="black" />
            </Ripple>
          </View>
          <Text style={styles.wordTranslate}>
            {translate}
          </Text>
        </View>
        <View style={styles.wordRight}>
          <Ripple
            rippleCentered
            rippleContainerBorderRadius={50}
            style={styles.icon}
            //onPress={() => dispatch(switchFavorites(lessonName, key || ''))}
          >
            <Image style={styles.flash} source={require('~/assets/images/flash.png')} />
          </Ripple>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
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
  wordTranslate: {
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

export default Words;
