import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ModalSetting from '~/src/components/TabPractice/Words/Header/ModalSetting';
import { Ripple, View } from '~/src/components/Themed';
import Colors from '~/src/constants/Colors';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabDifficultParamList } from '~/types';

type Props = {
  navigation: StackNavigationProp<TabDifficultParamList, 'TabDifficultScreen'>;
};

const TabDifficultRight = memo(({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const theme = useSelector((state: RootState) => state.common.theme);
  const words = useSelector((state: RootState) => state.practice.wordsDifficult);

  return (
    <View style={tailwind('w-20 flex-row justify-end items-center mr-1 mt-2')}>
      {words.length > 0 && (
        <Ripple style={styles.button} onPress={() => navigation.navigate('TabDifficultStudy')}>
          <SimpleLineIcons name="graduation" size={19} color={Colors[theme].text} />
        </Ripple>
      )}
      <Ripple style={styles.button} onPress={() => setModalVisible(true)}>
        <AntDesign name="setting" size={19} color={Colors[theme].text} />
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

export default TabDifficultRight;
