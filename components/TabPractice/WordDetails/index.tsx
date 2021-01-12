import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { Text, View } from '~/components/Themed';
import { TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabPracticeWordDetails = memo(({ route }: Props) => {
  const { name, mean, explain, pronounce } = route.params.word;

  return (
    <View style={styles.container}>
      <Text weight={700} style={styles.name}>
        {name}
      </Text>
      <Text weight={600} style={styles.pronounce}>
        {pronounce}
      </Text>
      <Ripple
        rippleCentered
        rippleContainerBorderRadius={50}
        style={{ padding: 3 }}
        onPress={() => Speech.speak(name, { language: 'en' })}
      >
        <MaterialIcons name="volume-up" size={16} color="black" />
      </Ripple>
      <Text weight={400} style={styles.mean}>
        {explain}
      </Text>
      <Text weight={700} style={[styles.mean, { marginTop: 20 }]}>
        {mean}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 70,
  },
  name: {
    fontSize: 20,
  },
  pronounce: {
    color: '#5e72e4',
  },
  mean: {
    textAlign: 'center',
  },
});

export default TabPracticeWordDetails;
