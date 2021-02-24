import React from 'react';
import { Text, View } from 'react-native';
import tailwind from '~/tailwind';
import ProcessBar from '../UI/ProcessBar';

type Props = {
  processText: string;
  processNumber: number;
};

const FlashScreen = React.memo((props: Props) => {
  const { processText, processNumber } = props;
  return (
    <View style={tailwind('flex-1 justify-center items-center px-10')}>
      <Text style={tailwind('text-center text-xl mb-3 font-bold')}>
        TOEIC <Text style={{ color: '#5e72e4' }}>Essential Words</Text>{' '}
      </Text>
      <ProcessBar percent={processNumber} border={1} rounded={15} height={7} color="#5e72e4" />
      <Text style={{ marginTop: 10, fontSize: 13 }}>{processText}</Text>
    </View>
  );
});

export default FlashScreen;
