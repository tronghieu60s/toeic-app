import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { Text, View } from '~/src/components/Themed';
import Modal from '~/src/components/UI/Modal';
import Switch from '~/src/components/UI/Switch';
import { lightBulbIcon } from '~/src/constants/IconSource';
import { toggleExplain, toggleMean, togglePronounce } from '~/src/redux/actions/commonAction';
import { RootState } from '~/src/redux/reducers/rootReducer';

type Props = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

const ModalSetting = memo((props: Props) => {
  const dispatch = useDispatch();
  const common = useSelector((state: RootState) => state.common);
  const { visibleMean, visibleExplain, visiblePronounce } = common;

  return (
    <Modal {...props}>
      <View style={tailwind('w-11/12 p-5 rounded-lg')}>
        <View style={tailwind('flex-row justify-between')}>
          <Image style={styles.flash} source={lightBulbIcon[0]} />
          <Image style={styles.flash} source={lightBulbIcon[1]} />
          <Image style={styles.flash} source={lightBulbIcon[2]} />
          <Image style={styles.flash} source={lightBulbIcon[3]} />
          <Image style={styles.flash} source={lightBulbIcon[4]} />
          <Image style={styles.flash} source={lightBulbIcon[5]} />
        </View>
        <Text weight={600} style={tailwind('text-center text-base mt-5 mb-1')}>
          Cài Đặt Hiển Thị
        </Text>
        <Switch
          name="Hiển Thị Nghĩa"
          description="Hiển thị nghĩa của từ vựng."
          value={visibleMean}
          onValueChange={() => dispatch(toggleMean())}
        />
        <Switch
          name="Hiển Thị Phiên Âm"
          description="Hiển thị phiên âm của từ vựng."
          value={visiblePronounce}
          onValueChange={() => dispatch(togglePronounce())}
        />
        <Switch
          name="Hiển Thị Giải Thích"
          description="Hiển thị giải thích của từ vựng."
          value={visibleExplain}
          onValueChange={() => dispatch(toggleExplain())}
        />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  flash: {
    width: 35,
    height: 35,
  },
});

export default ModalSetting;
