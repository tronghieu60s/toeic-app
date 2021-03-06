import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { getWordsByIdGroup } from '~/src/models/WordsModel';
import tailwind from '~/tailwind';
import { GroupType, TabPracticeParamList } from '~/types';
import { Ripple, Text } from '../Themed';

type Props = {
  group: GroupType;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default memo(function GroupItem(props: Props) {
  const { group, navigation } = props;
  const { id_group, name_group, pronounce_group = '', image_group } = group;
  const [countWords, setCountWords] = useState(0);
  const [countStudies, setCountStudies] = useState(-1);

  useEffect(() => {
    (async () => {
      const words = await getWordsByIdGroup(id_group);
      setCountWords(words.data.length);

      const countStudies = words.data.filter((item) => item.count_study === 6);
      setCountStudies(countStudies.length);
    })();
  }, []);

  const handlePressGroup = async () => {
    navigation.navigate('TabPracticeWords', { group });
  };

  const styleStudied =
    countStudies >= countWords ? { borderTopWidth: 3, borderColor: '#2dce89' } : {};

  return (
    <Ripple style={[styles.group, styleStudied]} onPress={handlePressGroup}>
      <Image source={{ uri: image_group }} style={tailwind('w-6 h-6')} />
      <Text weight={700} style={{ fontSize: 13.5, marginTop: 5 }}>
        {name_group}
      </Text>
      <Text weight={300} style={styles.groupPronounce}>
        {pronounce_group.substring(0, 20)}
        {pronounce_group.length > 20 ? '.../' : ''}
      </Text>
      {countStudies >= countWords && (
        <Text style={styles.number}>
          <Feather name="check" size={9} color="#fff" />
        </Text>
      )}
    </Ripple>
  );
});

const styles = StyleSheet.create({
  group: {
    ...tailwind('justify-center mb-3 mx-1 p-5 rounded-lg'),
    width: Dimensions.get('window').width / 2 - 13,
  },
  groupPronounce: { fontSize: 11.5, color: '#888', marginTop: 2 },
  number: {
    fontSize: 6,
    color: '#fff',
    backgroundColor: '#2dce89',
    position: 'absolute',
    top: 12,
    right: 12,
    paddingLeft: 3,
    paddingRight: 2,
    paddingVertical: 2.3,
    borderRadius: 15,
  },
});
