import React, { memo } from 'react';
import { Image } from 'react-native';
import tailwind from '~/tailwind';
import { Text, View } from '../Themed';

type Props = { children: React.ReactNode };

export default memo(function ScreenEmpty(props: Props) {
  const { children } = props;
  return (
    <View light style={tailwind('flex-1 justify-center items-center px-10 pb-20')}>
      <Image style={tailwind('w-12 h-12 mb-2')} source={require('~/assets/images/box.png')} />
      <Text style={{ fontSize: 13, textAlign: 'center' }}>{children}</Text>
    </View>
  );
});
