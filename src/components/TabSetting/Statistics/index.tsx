import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getWordsStudied } from '~/src/models/StudiesModel';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { Text, View } from '../../Themed';

export default memo(function TabSettingStatistics() {
  const [countStudied, setCountStudied] = useState(0);

  const wordsDifficult = useSelector((state: RootState) => state.practice.wordsDifficult);
  const { streak, experience } = useSelector((state: RootState) => state.statistics);

  useEffect(() => {
    (async () => {
      const wordsStudied = await getWordsStudied();
      const countWordsStudied = wordsStudied.data.length;
      setCountStudied(countWordsStudied);
    })();
  }, []);

  return (
    <View style={tailwind('flex-row justify-around')}>
      <View style={tailwind('justify-center')}>
        <ExperienceBlock text="Streak" number={streak}>
          <FontAwesome5 name="fire" size={22} color="#FF5A00" />
        </ExperienceBlock>
        <ExperienceBlock text="Từ đã học" number={countStudied}>
          <FontAwesome5 name="graduation-cap" size={20} color="#2dce89" />
        </ExperienceBlock>
      </View>
      <View style={tailwind('justify-center')}>
        <ExperienceBlock text="Tổng điểm KN" number={experience}>
          <Ionicons name="md-flash" size={22} color="#FFE808" />
        </ExperienceBlock>
        <ExperienceBlock text="Từ khó còn lại" number={wordsDifficult.length}>
          <Ionicons name="md-flash" size={20} color="#5e72e4" />
        </ExperienceBlock>
      </View>
    </View>
  );
});

type TypeExperienceBlock = {
  text: string;
  number: number;
  children: JSX.Element;
};

export function ExperienceBlock(props: TypeExperienceBlock): JSX.Element {
  const { text, number, children } = props;
  return (
    <View style={tailwind('flex-row items-center mb-3')}>
      <View style={tailwind('w-6 items-center')}>{children}</View>
      <View style={tailwind('ml-2')}>
        <Text weight={700} style={tailwind('text-base tracking-wider')}>
          {number}
        </Text>
        <Text style={tailwind('text-xs text-gray-500')}>{text}</Text>
      </View>
    </View>
  );
}
