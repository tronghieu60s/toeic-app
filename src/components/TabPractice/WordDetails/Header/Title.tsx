import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import tailwind from '~/tailwind';
import { Text, View } from '~/src/components/Themed';
import { TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabPracticeWordDetailHeaderTitle = memo((props: Props) => {
  const { route } = props;
  const { name_word, pronounce_word, name_group } = route.params.word;

  return (
    <View>
      <View style={tailwind('flex-row items-center')}>
        <Text weight={700} style={tailwind('text-sm tracking-wide')}>
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
  pronounce: {
    fontSize: 11,
    color: '#5e72e4',
  },
});

export default TabPracticeWordDetailHeaderTitle;
