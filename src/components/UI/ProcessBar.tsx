import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type Props = {
  percent: number;
  height?: number;
  color?: string;
};

ProcessBar.defaultProps = {
  height: 3,
  color: '#2dce89',
};

export default function ProcessBar(props: Props): JSX.Element {
  const { percent, height = 0, color } = props;

  const animVal = new Animated.Value(0);
  const [prePercent, setPrePercent] = useState(0);
  const [interpolateBar, setInterpolateBar] = useState(() => {
    return animVal.interpolate({ inputRange: [0, 1], outputRange: ['0%', '50%'] });
  });

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

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.process,
          {
            height,
            width: interpolateBar,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

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
