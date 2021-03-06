/* eslint-disable no-await-in-loop */
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useDispatch } from 'react-redux';
import Layout from '~/src/constants/Layout';
import { getWordsByIdWord } from '~/src/models/WordsModel';
import { actLoadGroups, actLoadWordsStudied } from '~/src/redux/actions/practiceAction';
import tailwind from '~/tailwind';
import { TabPracticeParamList, WordType } from '~/types';
import { ScrollView, Text, View } from '../../Themed';
import ScreenLoading from '../../UI/ScreenLoading';
import WordItem from '../Words/WordItem';

const chartConfig = {
  color: () => '#000',
  barPercentage: 0.5,
};

const { width: screenWidth } = Layout.window;

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeResult'>;
};

export default memo(function TabPracticeResult({ route }: Props) {
  const [isPending, setIsPending] = useState(true);
  const { results } = route.params;
  const { point, correct, inCorrect, words: wordsId } = results;
  const [words, setWords] = useState<WordType[]>([]);

  const dispatch = useDispatch();
  const data = [
    {
      name: 'Trả lời đúng',
      population: correct,
      color: '#2dce89',
    },
    {
      name: 'Trả lời sai',
      population: inCorrect,
      color: '#f5365c',
    },
  ];

  useEffect(() => {
    (async () => {
      const words = [];
      for (let i = 0; i < wordsId.length; i += 1) {
        const word = await getWordsByIdWord(wordsId[i]);
        words.push(word.data[0]);
      }
      setWords(words);

      await dispatch(actLoadGroups());
      await dispatch(actLoadWordsStudied());
      setIsPending(false);
    })();
  }, []);

  if (isPending) return <ScreenLoading />;

  return (
    <ScrollView light>
      <View style={tailwind('mx-2 mt-2 pb-5 rounded-lg')}>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          hasLegend={false}
          paddingLeft={(screenWidth / 4.5).toString()}
          avoidFalseZero
          absolute
        />
        <View style={tailwind('mx-16 mt-2')}>
          <View style={tailwind('flex-row items-center')}>
            <AntDesign name="checkcircleo" size={15} color="#2dce89" />
            <Text style={styles.text}>{`Trả lời đúng: ${correct}`}</Text>
          </View>
          <View style={tailwind('flex-row items-center')}>
            <FontAwesome5 name="times-circle" size={15} color="#f5365c" />
            <Text style={styles.text}>{`Trả lời sai: ${inCorrect}`}</Text>
          </View>
          <View style={tailwind('flex-row items-center')}>
            <AntDesign name="pluscircleo" size={15} color="#fb6340" />
            <Text style={styles.text}>{`Điểm nhận được: ${point}`}</Text>
          </View>
        </View>
      </View>
      <View style={tailwind('px-2 mt-2 bg-transparent')}>
        {words.map((item, index) => {
          return <WordItem key={index} word={item} />;
        })}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  text: {
    ...tailwind('text-base tracking-wider leading-8 ml-2'),
  },
});
