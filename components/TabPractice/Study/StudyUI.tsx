import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '~/components/Themed';
import { lightBulbIcon } from '~/constants/IconSource';
import { WordType } from '~/types';

type Props = {
  words: WordType;
  children: JSX.Element;
};

const StudyUI = memo(({ words, children }: Props) => {
  const { mean_word, count_study } = words;

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={styles.viewTop}>
        <Text weight={700} style={styles.question}>
          {mean_word}
        </Text>
        <View style={styles.lightBulb}>
          <Image style={styles.lightBulbImage} source={lightBulbIcon[count_study || 0]} />
        </View>
      </View>
      <View style={styles.viewCenter}>{children}</View>
    </View>
  );
});

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
  lightBulb: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightBulbImage: {
    width: 40,
    height: 40,
  },
});

export default StudyUI;
