import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Ripple, View } from '~/src/components/Themed';
import Colors from '~/src/constants/Colors';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import TabPracticeWordDetailsHeaderModalSetting from './ModalSetting';

const TabPracticeWordDetailsHeaderRight = React.memo(() => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useSelector((state: RootState) => state.common.theme);

  return (
    <View style={styles.container}>
      <Ripple style={styles.button} onPress={() => setModalVisible(true)}>
        <AntDesign name="setting" size={19} color={Colors[theme].text} />
      </Ripple>
      <TabPracticeWordDetailsHeaderModalSetting
        modalVisible={modalVisible}
        setModalVisible={(value) => setModalVisible(value)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...tailwind('flex-row justify-center items-center mr-1 mt-2'),
    backgroundColor: '#fff0',
  },
  button: { ...tailwind('justify-center items-center p-2'), backgroundColor: '#fff0' },
});

export default TabPracticeWordDetailsHeaderRight;
