import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from '~/src/components/Themed';
import Modal from '~/src/components/UI/Modal';
import Switch from '~/src/components/UI/Switch';
import { toggleExplain, toggleMean, togglePronounce } from '~/src/redux/actions/commonAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';

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
        <Text weight={600} style={tailwind('text-center text-base mb-2')}>
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

export default ModalSetting;
