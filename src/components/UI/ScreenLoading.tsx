import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import tailwind from '~/tailwind';
import { View } from '../Themed';

type Props = { transparent?: boolean };

export default function ScreenLoading({ transparent }: Props): JSX.Element {
  return (
    <View style={[styles.container, { backgroundColor: transparent ? 'transparent' : '#fff' }]}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
}

ScreenLoading.defaultProps = { transparent: false };

const styles = StyleSheet.create({
  container: {
    ...tailwind('flex-1 justify-center items-center px-10 pb-20'),
  },
});
