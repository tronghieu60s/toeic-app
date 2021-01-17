import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '~/components/Themed';
import { GroupType, TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabPracticeWordDetailHeaderTitle = memo(({ route }: Props) => {
  const { name_word, pronounce_word, name_group } = route.params.word;

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text weight={700} style={styles.name}>
          {name_group}
        </Text>
      </View>
      <Text style={styles.pronounce}>
        {name_word}
        {' - '}
        {pronounce_word}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    letterSpacing: 0.7,
  },
  pronounce: {
    color: '#5e72e4',
    fontSize: 11,
  },
});

export default TabPracticeWordDetailHeaderTitle;
