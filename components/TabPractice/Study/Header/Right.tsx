import { FontAwesome5 } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { Text, View } from '~/components/Themed';

const TabPracticeStudyHeaderRight = memo(() => (
  <View style={styles.container}>
    <Ripple rippleCentered rippleContainerBorderRadius={50} style={styles.iconVolume}>
      <FontAwesome5 name="volume-mute" size={22} color="black" />
    </Ripple>
    <View style={styles.point}>
      <Text weight={700} style={styles.pointText}>1200</Text>
    </View>
  </View>
));

const styles = StyleSheet.create({
  container: {
    width: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'transparent',
  },
  iconVolume: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {
        rotate: '-10deg',
      },
    ],
  },
  point: {
    width: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7de3b7',
    paddingVertical: 3,
  },
  pointText: {
    fontSize: 13,
  },
});

export default TabPracticeStudyHeaderRight;
