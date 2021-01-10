import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '~/components/Themed';
import { TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWordsHeaderTitle = memo(({ route }: Props) => {
  const { name, pronounce } = route.params;

  return (
    <View>
      <Text weight={700} style={styles.name}>
        {name}
      </Text>
      <Text style={styles.pronounce}>{pronounce}</Text>
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
    fontSize: 13,
  },
});

export default TabPracticeWordsHeaderTitle;
