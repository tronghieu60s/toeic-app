import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import Layout from '~/src/constants/Layout';
import tailwind from '~/tailwind';
import { ScrollView, Text, View } from '../Themed';
import ButtonDefault from '../UI/ButtonDefault';
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
  const data: LineChartData = {
    labels: ['', '02 Feb', '', '04 Feb', '', '06 Feb', ''],
    datasets: [
      {
        data: [5, 8, 3, 9, 13, 9, 8],
        color: (opacity = 1) => `rgba(94, 114, 228, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [30, 30, 30, 30, 30, 30, 30],
        color: () => 'rgba(245, 54, 92)',
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView light style={tailwind('p-2')}>
      <ContentBlock title="Bản thân">
        <View style={tailwind('flex-row justify-around mb-2')}>
          <View>
            <ExperienceBlock text="Streak" number={5}>
              <FontAwesome5 name="fire" size={22} color="#FF5A00" />
            </ExperienceBlock>
            <ExperienceBlock text="Từ đã học" number={5}>
              <FontAwesome5 name="graduation-cap" size={20} color="#2dce89" />
            </ExperienceBlock>
          </View>
          <View>
            <ExperienceBlock text="Tổng điểm KN" number={12000}>
              <Ionicons name="md-flash" size={22} color="#FFE808" />
            </ExperienceBlock>
            <ExperienceBlock text="T.gian học (phút)" number={120}>
              <Entypo name="time-slot" size={20} color="#5e72e4" />
            </ExperienceBlock>
          </View>
        </View>
      </ContentBlock>
      <ContentBlock title="Số từ đã học gần đây">
        <View>
          <Text style={styles.textChart}>Mục tiêu: 30</Text>
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
          <ButtonDefault title="Đặt mục tiêu hằng ngày" onPress={() => console.log('test')} />
        </View>
      </ContentBlock>
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
    <View style={tailwind('flex-row items-center mb-2')}>
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
