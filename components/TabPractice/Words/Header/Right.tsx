import { AntDesign, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { View } from '~/components/Themed';
import TabPracticeWordsHeaderModal from './Modal';

const TabPracticeWordsHeaderRight = memo(() => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Ripple
        style={styles.button}
        rippleCentered
        rippleContainerBorderRadius={50}
        //onPress={() => dispatch(lessonsFavoriteSwitch(!showFavorite))}
      >
        <SimpleLineIcons name="graduation" size={22} color="black" />
      </Ripple>
      <Ripple
        style={styles.button}
        rippleCentered
        rippleContainerBorderRadius={50}
        //onPress={() => dispatch(lessonsRandomSwitch(!lessonsRandom))}
      >
        <Entypo name="time-slot" size={18} color="black" />
      </Ripple>
      <Ripple
        style={styles.button}
        rippleCentered
        rippleContainerBorderRadius={50}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="setting" size={20} color="black" />
      </Ripple>
      <TabPracticeWordsHeaderModal
        modalVisible={modalVisible}
        setModalVisible={(value) => setModalVisible(value)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5,
  },
  button: {
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabPracticeWordsHeaderRight;
