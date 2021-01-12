import React, { memo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';
import ProcessBar from '~/components/UI/ProcessBar';

const TabPracticeStudy = memo(() => (
  <View style={styles.container}>
    <ProcessBar percent={90} />
    <View style={styles.viewBottom}>
      <TouchableOpacity style={styles.continue}>
        <Text weight={700} style={styles.continueText}>
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewBottom: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 15,
  },
  continue: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb6340',
    borderRadius: 15,
    paddingVertical: 8,
  },
  continueText: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
});

export default TabPracticeStudy;
