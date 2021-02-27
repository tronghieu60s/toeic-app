import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useState } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import { Ripple, View } from '~/src/components/Themed';
import Colors from '~/src/constants/Colors';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabPracticeParamList } from '~/types';
import TabPracticeWordsHeaderModalSetting from './ModalSetting';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

export default memo(function TabPracticeWordsHeaderRight({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const theme = useSelector((state: RootState) => state.common.theme);
  const words = useSelector((state: RootState) => state.practice.words);

  const onPressTimeStudy = () => {
    ToastAndroid.show(
      'Chức năng này đang cập nhật và sẽ được thêm vào các phiên bản sắp tới.',
      ToastAndroid.SHORT,
    );
  };

  return (
    <View style={styles.container}>
      {words.length > 0 && (
        <>
          <Ripple style={styles.button} onPress={() => navigation.navigate('TabPracticeStudy')}>
            <SimpleLineIcons name="graduation" size={20} color={Colors[theme].text} />
            {/* <Text style={styles.number}>10</Text> */}
          </Ripple>
          <Ripple style={styles.button} onPress={onPressTimeStudy}>
            <Entypo name="time-slot" size={17.5} color={Colors[theme].text} />
          </Ripple>
        </>
      )}
      <Ripple style={styles.button} onPress={() => setModalVisible(true)}>
        <AntDesign name="setting" size={19} color={Colors[theme].text} />
      </Ripple>
      <TabPracticeWordsHeaderModalSetting
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
  number: {
    fontSize: 6,
    color: '#fff',
    backgroundColor: '#f5365c',
    position: 'absolute',
    bottom: 4,
    right: 2,
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: 15,
  },
});
