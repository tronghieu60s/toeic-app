import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      {words.length > 0 && (
        <Ripple style={styles.button} onPress={() => navigation.navigate('TabPracticeStudy')}>
          <SimpleLineIcons name="graduation" size={20} color={Colors[theme].text} />
        </Ripple>
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
});
