import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import Layout from '~/src/constants/Layout';
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
      <ContentBlock title="Số từ đã học gần đây">
        <View>
          <Text style={styles.textChart}>Mục tiêu: 30</Text>
          <LineChart
            data={data}
            width={screenWidth - 20}
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
      </ContentBlock>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  textChart: {
    color: '#f5365c',
    position: 'absolute',
    fontSize: 10,
    left: '13%',
    zIndex: 500,
  },
});
