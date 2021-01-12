import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';
import ProcessBar from '~/components/UI/ProcessBar';

const TabPracticeStudy = memo(() => (
  <View style={styles.container}>
    <ProcessBar percent={90} />
    <View style={styles.viewTop}>
      <Text weight={700} style={styles.question}>assurance</Text>
      <Image style={styles.flash} source={require('~/assets/images/lightbulb-0.png')} />
    </View>
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
  viewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  question: {
    flex: 8,
    fontSize: 20,
  },
  flash: {
    width: 40,
    height: 40,
  },
});

export default TabPracticeStudy;
