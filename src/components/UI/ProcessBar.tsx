import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  percent: number;
  rounded?: number;
  border?: number;
  height?: number;
  color?: string;
};

const ProcessBar = (props: Props) => {
  const { percent, rounded, border, height = 0, color } = props;

  const styleContainer = {
    height: height + 2,
    borderRadius: rounded,
    borderWidth: border,
  };

  const styleProcess = {
    width: `${percent}%`,
    backgroundColor: color,
    height,
    borderRadius: rounded,
  };

  return (
    <View style={[styles.container, styleContainer]}>
      <View style={[styles.process, styleProcess]} />
    </View>
  );
};

ProcessBar.defaultProps = {
  rounded: 0,
  border: 0,
  height: 3,
  color: '#2dce89',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    borderColor: '#666',
    zIndex: 500,
  },
  process: {
    height: 3,
    backgroundColor: '#2dce89',
  },
});

export default ProcessBar;
