import React, { memo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import tailwind from '~/tailwind';

type Props = {
  processText: string;
};

export default memo(function FlashScreen(props: Props) {
  const { processText } = props;
  return (
    <View style={tailwind('flex-1 justify-center items-center px-10')}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text style={{ marginTop: 10, fontSize: 13 }}>{processText}</Text>
    </View>
  );
});
