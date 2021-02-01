import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import ModalSetting from '~/src/components/Common/ModalSetting';
import { Ripple, View } from '~/src/components/Themed';
import { RootState } from '~/src/redux/reducers/rootReducer';
import { TabPracticeParamList } from '~/types';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWordsHeaderRight = memo(({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const words = useSelector((state: RootState) => state.practice.words);
  const wordsStudy = words.filter((o) => (o.count_study || 0) < 5);

  return (
    <View style={tailwind('w-20 flex-row justify-end items-center mr-2')}>
      {words.length > 0 && (
        <>
          {wordsStudy.length > 0 && (
            <Ripple style={styles.button} onPress={() => navigation.navigate('TabPracticeStudy')}>
              <SimpleLineIcons name="graduation" size={22} color="black" />
            </Ripple>
          )}
          <Ripple style={styles.button}>
            <Entypo name="time-slot" size={18} color="black" />
          </Ripple>
        </>
      )}
      <Ripple style={styles.button} onPress={() => setModalVisible(true)}>
        <AntDesign name="setting" size={20} color="black" />
      </Ripple>
      <ModalSetting
        modalVisible={modalVisible}
        setModalVisible={(value) => setModalVisible(value)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  button: { ...tailwind('p-2 ml-1 justify-center items-center') },
});

export default TabPracticeWordsHeaderRight;
