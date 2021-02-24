import React from 'react';
import { Modal as DefaultModal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import tailwind from '~/tailwind';

type Props = {
  children: JSX.Element;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

const Modal = React.memo((props: Props) => {
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

export default Modal;
