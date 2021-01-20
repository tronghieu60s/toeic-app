import { SimpleLineIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Ripple, Text, View } from '~/components/Themed';
import { SpeechEnglish } from '~/helpers/sound';
import { WordType } from '~/types';

type Props = {
  word: WordType;
};

const StudyWord = memo(({ word }: Props) => {
  const { name_word, mean_word, explain_word } = word;

  return (
    <View style={{ height: '90%', zIndex: 1 }}>
      <View style={styles.viewTop}>
        <Ripple
          style={styles.sound}
          onPress={() => SpeechEnglish(name_word || '')}
        >
          <SimpleLineIcons name="volume-2" size={24} color="black" />
        </Ripple>
        <Text weight={700} style={styles.wordName}>
          {name_word}
        </Text>
      </View>
      <View style={styles.viewBottom}>
        <View style={{ alignItems: 'center' }}>
          <Text weight={700} style={{ color: '#9d9d9d' }}>
            VIETNAMESE
          </Text>
          <Text weight={700} style={styles.wordMean}>
            {mean_word}
          </Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text weight={700} style={{ color: '#9d9d9d' }}>
            GIẢI THÍCH
          </Text>
          <Text style={styles.wordExplain}>{explain_word}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewTop: {
    height: '40%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fdfaf3',
  },
  viewBottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
  },
  sound: {
    width: 70,
    height: 70,
    backgroundColor: '#ffc000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    transform: [{ rotate: '-10deg' }],
  },
  wordName: {
    fontSize: 22,
  },
  wordExplain: {
    fontSize: 15,
    marginTop: 3,
    textAlign: 'center',
  },
  wordMean: {
    fontSize: 17,
    marginTop: 3,
    textAlign: 'center',
  },
});

export default StudyWord;
