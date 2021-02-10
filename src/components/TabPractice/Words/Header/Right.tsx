import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import ModalSetting from '~/src/components/TabPractice/Words/Header/ModalSetting';
import { Ripple, View } from '~/src/components/Themed';
import Colors from '~/src/constants/Colors';
import { RootState } from '~/src/redux/reducers/rootReducer';
import { TabPracticeParamList } from '~/types';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWordsHeaderRight = memo(({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const theme = useSelector((state: RootState) => state.common.theme);
  const words = useSelector((state: RootState) => state.practice.words);
  const wordsStudy = words.filter((o) => (o.count_study || 0) < 5);

  return (
    <View style={tailwind('flex-row justify-end items-center mr-2')}>
      {words.length > 0 && (
        <>
          {wordsStudy.length > 0 && (
            <Ripple style={styles.button} onPress={() => navigation.navigate('TabPracticeStudy')}>
              <SimpleLineIcons name="graduation" size={22} color={Colors[theme].text} />
            </Ripple>
          )}
          {/* <Ripple style={styles.button}>
            <Entypo name="time-slot" size={18} color={Colors[theme].text} />
          </Ripple> */}
        </>
      )}
      <Ripple style={styles.button} onPress={() => setModalVisible(true)}>
        <AntDesign name="setting" size={20} color={Colors[theme].text} />
      </Ripple>
      <ModalSetting
        modalVisible={modalVisible}
        setModalVisible={(value) => setModalVisible(value)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  button: { ...tailwind('justify-center items-center p-2') },
});

export default TabPracticeWordsHeaderRight;
