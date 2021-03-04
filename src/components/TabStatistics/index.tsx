import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '~/src/constants/Layout';
import { getWordsStudied } from '~/src/models/WordsModel';
import { setTarget } from '~/src/redux/actions/statisticsAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { ScrollView, Text, View } from '../Themed';
import ContentBlock from '../UI/ContentBlock';

const { width: screenWidth } = Layout.window;

const chartConfig: AbstractChartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
  useShadowColorFromDataset: true,
  propsForBackgroundLines: {
    strokeDasharray: '4',
    strokeWidth: 0.25,
    stroke: 'rgba(0, 0, 0, .50)',
  },
};

export default memo(function TabStatistics() {
  const [exp, setExp] = useState(0);
  const [countStudied, setCountStudied] = useState(0);

  const dispatch = useDispatch();
  const wordsDifficult = useSelector((state: RootState) => state.practice.wordsDifficult);
  const { streak, experience, target } = useSelector((state: RootState) => state.statistics);
  const [experienceText, setExperienceText] = useState(() => target.toString());

  const data: LineChartData = {
    labels: ['', '02 Feb', '', '04 Feb', '', '06 Feb', ''],
    datasets: [
      {
        data: [5, 8, 3, 9, 13, 9, 8],
        color: (opacity = 1) => `rgba(94, 114, 228, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [target, target, target, target, target, target, target],
        color: () => 'rgba(245, 54, 92)',
        strokeWidth: 2,
      },
    ],
  };

  const onPressExperience = () => {
    if (experienceText.length <= 0 || parseInt(experienceText, 10) <= 0) {
      ToastAndroid.show('Vui lòng nhập một số nguyên lớn hơn 0.', ToastAndroid.SHORT);
    } else {
      dispatch(setTarget(parseInt(experienceText, 10)));
    }
  };

  useEffect(() => {
    (async () => {
      const wordsStudied = await getWordsStudied();
      const countWordsStudied = wordsStudied.data.length;
      setCountStudied(countWordsStudied);

      setExp(exp);
    })();
  }, []);

  return (
    <ScrollView light style={tailwind('p-2')}>
      <View light style={tailwind('pb-20')}>
        <ContentBlock title="Bản thân">
          <View style={tailwind('flex-row justify-around mb-2')}>
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
        </ContentBlock>
        <ContentBlock title="Điểm kinh nghiệm hằng ngày">
          <View>
            <View style={tailwind('mb-8 flex-row items-center')}>
              <TextInput
                keyboardType="number-pad"
                style={styles.input}
                onChangeText={(text) => setExperienceText(text)}
                value={experienceText}
              />
              <TouchableOpacity style={styles.button} onPress={onPressExperience}>
                <Text style={{ color: '#fff' }}>Đặt mục tiêu</Text>
              </TouchableOpacity>
            </View>
            <View style={tailwind('mb-3')}>
              <Text style={styles.textChart}>{`Mục tiêu: ${target}`}</Text>
              <View style={styles.absoluteView} />
              <LineChart
                data={data}
                width={screenWidth}
                height={160}
                chartConfig={chartConfig}
                fromZero
                segments={3}
                yLabelsOffset={15}
                yAxisInterval={10}
                withShadow={false}
                style={tailwind('-ml-7 my-1')}
              />
            </View>
          </View>
        </ContentBlock>
      </View>
    </ScrollView>
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

const styles = StyleSheet.create({
  input: {
    ...tailwind('w-3/12 h-9 border px-4'),
    borderColor: '#dee2e6',
    borderRadius: 2,
  },
  button: {
    ...tailwind('justify-center items-center p-2 ml-2'),
    backgroundColor: '#5e72e4',
    borderRadius: 2,
  },
  textChart: {
    color: '#f5365c',
    position: 'absolute',
    fontSize: 10,
    left: '13%',
    zIndex: 500,
  },
  absoluteView: {
    width: '7%',
    height: 160,
    position: 'absolute',
    right: -10,
    top: 0,
    zIndex: 500,
  },
});
