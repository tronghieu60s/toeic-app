import React, { memo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View } from '../Themed';

const ProcessBar = memo(({ percent }: { percent: number }) => {
  const { width } = Dimensions.get('window');
  const widthProcess = (width * percent) / 100;

  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.process, { width: widthProcess }]} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 3,
    zIndex: 500,
  },
  process: {
    height: 3,
    backgroundColor: '#2dce89',
  },
});

export default ProcessBar;
