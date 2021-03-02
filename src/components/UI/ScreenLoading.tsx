import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import tailwind from '~/tailwind';
import { View } from '../Themed';

export default memo(function ScreenLoading() {
  return (
    <View style={tailwind('flex-1 justify-center items-center px-10')}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
});
