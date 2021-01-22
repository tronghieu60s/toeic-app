import { AntDesign } from '@expo/vector-icons';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import ModalSetting from '~/components/Common/ModalSetting';
import { Ripple, View } from '~/components/Themed';

const TabDifficultRight = memo(() => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
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

export default TabDifficultRight;
