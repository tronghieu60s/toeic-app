import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '~/components/Themed';
import { WordType } from '~/types';

type Props = {
  words: WordType;
  children: JSX.Element;
};

const StudyUI = memo(({ words, children }: Props) => (
  <View style={{ flex: 1, justifyContent: 'space-between' }}>
    <View style={styles.viewTop}>
      <Text weight={700} style={styles.question}>
        {words.mean_word}
      </Text>
      <View style={styles.flash}>
        <Image style={styles.flashImage} source={require('~/assets/images/lightbulb-0.png')} />
      </View>
    </View>
    <View style={styles.viewCenter}>{children}</View>
  </View>
));

const styles = StyleSheet.create({
  viewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  viewCenter: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  question: {
    flex: 8,
    fontSize: 18,
  },
  flash: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashImage: {
    width: 40,
    height: 40,
  },
});

export default StudyUI;
