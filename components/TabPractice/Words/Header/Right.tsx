import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Ripple, View } from '~/components/Themed';
import { RootState } from '~/redux/reducers/rootReducer';
import { TabPracticeParamList } from '~/types';
import TabPracticeWordsHeaderModal from './Modal';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWordsHeaderRight = memo(({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const words = useSelector((state: RootState) => state.practice.words);

  return (
    <View style={styles.container}>
      {words.length > 0 && (
        <>
          <Ripple
            style={styles.button}
            onPress={() => navigation.navigate('TabPracticeStudy')}
          >
            <SimpleLineIcons name="graduation" size={22} color="black" />
          </Ripple>
          <Ripple style={styles.button} rippleCentered rippleContainerBorderRadius={50}>
            <Entypo name="time-slot" size={18} color="black" />
          </Ripple>
        </>
      )}
      <Ripple
        style={styles.button}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 5,
  },
  button: {
    padding: 7,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabPracticeWordsHeaderRight;
