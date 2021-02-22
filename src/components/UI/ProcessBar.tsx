import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type Props = {
  percent: number;
  rounded?: number;
  border?: number;
  height?: number;
  color?: string;
};

const ProcessBar = (props: Props) => {
  const { percent, rounded, border, height = 0, color } = props;

  const animVal = new Animated.Value(0);
  const [prePercent, setPrePercent] = useState(0);
  const [interpolateBar, setInterpolateBar] = useState(() =>
    animVal.interpolate({ inputRange: [0, 1], outputRange: ['0%', '50%'] }));

  useEffect(() => {
    Animated.timing(animVal, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();

    const outputRange = [`${prePercent}%`, `${percent}%`];
    const interpolateBar = animVal.interpolate({ inputRange: [0, 1], outputRange });
    setInterpolateBar(interpolateBar);
    setPrePercent(percent);
  }, [percent]);

  const styleContainer = {
    height: height + 2,
    borderColor: color,
    borderRadius: rounded,
    borderWidth: border,
  };

  const styleProcess = {
    width: interpolateBar,
    backgroundColor: color,
    height,
    borderRadius: rounded,
  };

  return (
    <View style={[styles.container, styleContainer]}>
      <Animated.View style={[styles.process, styleProcess]} />
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
    zIndex: 500,
  },
  process: {
    height: 3,
    backgroundColor: '#2dce89',
  },
});

export default ProcessBar;
