import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from '~/src/components/Themed';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';

const TabPracticeStudyHeaderRight = memo(() => {
  const fadePoint = useRef(new Animated.Value(1)).current;
  const fadePrePoint = useRef(new Animated.Value(0)).current;

  const pointState = useSelector((state: RootState) => state.practice.point);
  const [point, setPoint] = useState(() => pointState);
  const [prePoint, setPrePoint] = useState(() => pointState - point);

  useEffect(() => {
    Animated.timing(fadePoint, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setPrePoint(pointState - point);
      Animated.timing(fadePrePoint, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadePrePoint, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setPoint(pointState);
          Animated.timing(fadePoint, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }).start();
        });
      });
    });
  }, [pointState]);

  return (
    <View style={styles.container}>
      <View style={styles.point}>
        <Animated.View style={{ opacity: fadePoint }}>
          <Text weight={700} style={tailwind('text-sm')}>
            {point}
          </Text>
        </Animated.View>
        <Animated.View style={{ position: 'absolute', opacity: fadePrePoint }}>
          <Text weight={700} style={tailwind('text-sm')}>
            {prePoint}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { ...tailwind('w-28 flex-row justify-end items-center bg-transparent mr-3') },
  iconVolume: {
    ...tailwind('h-10 w-10 justify-center items-center mr-1'),
    transform: [{ rotate: '-10deg' }],
  },
  point: {
    ...tailwind('w-14 rounded-md justify-center items-center mt-3'),
    paddingVertical: 2,
    backgroundColor: '#7de3b7',
  },
});

export default TabPracticeStudyHeaderRight;
