import React, { memo } from 'react';
import { Modal as DefaultModal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import tailwind from 'tailwind-rn';

type Props = {
  children: JSX.Element;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export default memo(function Modal(props: Props) {
  const { children, modalVisible, setModalVisible } = props;

  return (
    <DefaultModal
      transparent
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => setModalVisible(false)}
        style={tailwind('w-full h-full justify-center items-center bg-black bg-opacity-70')}
      >
        <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
      </TouchableOpacity>
    </DefaultModal>
  );
});
