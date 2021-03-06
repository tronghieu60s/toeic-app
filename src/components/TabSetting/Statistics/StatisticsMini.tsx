import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { Text, View } from '../../Themed';

export default memo(function TabSettingStatisticsMini() {
  const wordsStudied = useSelector((state: RootState) => state.practice.wordsStudied);
  const wordsDifficult = useSelector((state: RootState) => state.practice.wordsDifficult);
  const { streak, experience } = useSelector((state: RootState) => state.statistics);

  return (
    <View style={tailwind('flex-row justify-around py-3')}>
      <BlockIconText value={streak}>
        <FontAwesome5 name="fire" size={18} color="#FF5A00" />
      </BlockIconText>
      <BlockIconText value={experience}>
        <Ionicons name="md-flash" size={18} color="#FFE808" />
      </BlockIconText>
      <BlockIconText value={wordsStudied.length}>
        <FontAwesome5 name="graduation-cap" size={16} color="#2dce89" />
      </BlockIconText>
      <BlockIconText value={wordsDifficult.length}>
        <Ionicons name="md-flash" size={16} color="#5e72e4" />
      </BlockIconText>
    </View>
  );
});

type BlockIconTextProps = {
  value: number;
  children: JSX.Element;
};

export function BlockIconText(props: BlockIconTextProps): JSX.Element {
  const { value, children } = props;
  return (
    <View style={tailwind('flex-row items-center')}>
      {children}
      <Text weight={700} style={tailwind('ml-2')}>
        {value}
      </Text>
    </View>
  );
}
