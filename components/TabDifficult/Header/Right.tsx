import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ModalSetting from '~/components/Common/ModalSetting';
import { Ripple, View } from '~/components/Themed';
import { RootState } from '~/src/redux/reducers/rootReducer';
import { TabDifficultParamList } from '~/types';

type Props = {
  navigation: StackNavigationProp<TabDifficultParamList, 'TabDifficultScreen'>;
};

const TabDifficultRight = memo(({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const words = useSelector((state: RootState) => state.practice.wordsDifficult);

  return (
    <View style={styles.container}>
      {words.length > 0 && (
        <Ripple style={styles.button} onPress={() => navigation.navigate('TabDifficultStudy')}>
          <Ionicons name="ios-flash" size={24} color="black" />
        </Ripple>
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
  flash: {
    width: 20,
    height: 20,
  },
});

export default TabDifficultRight;
