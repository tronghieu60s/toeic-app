import React, { memo } from 'react';
import { Text, View } from 'react-native';
import tailwind from '~/tailwind';
import ProcessBar from '../UI/ProcessBar';

type Props = {
  processText: string;
  processNumber: number;
};

export default memo(function FlashScreen({ processText, processNumber }: Props) {
  return (
    <View style={tailwind('flex-1 justify-center items-center px-10')}>
      <ProcessBar percent={processNumber} border={1} rounded={15} height={7} color="#5e72e4" />
      <Text style={{ marginTop: 10, fontSize: 13 }}>{processText}</Text>
    </View>
  );
});
