import React, { memo } from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, View } from '~/components/Themed';
import Switch from '~/components/UI/Switch';

type Props = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

const TabPracticeWordsHeaderModal = memo(({ modalVisible, setModalVisible }: Props) => {
  const dispatch = useDispatch();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => setModalVisible(false)}
        style={styles.coverView}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Text weight={600} style={styles.modalText}>
              Cài Đặt Hiển Thị
            </Text>
            <Switch
              name="Hiển Thị Phiên Âm"
              description="Hiển thị phiên âm cách đọc của từ vựng."
              //value={lessonsSpelling}
              //onValueChange={(value) => dispatch(lessonsSpellingSwitch(value))}
            />
            <Switch
              name="Hiển Thị Nghĩa Tiếng Anh"
              description="Hiển thị giải thích nghĩa bằng Tiếng Anh."
              //   value={lessonsEnglish}
              //   onValueChange={(value) => dispatch(lessonsEnglishSwitch(value))}
            />
            <Switch
              name="Hiển Thị Nghĩa"
              description="Hiển thị nghĩa Tiếng Việt của từ vựng."
              //   value={lessonsTranslate}
              //   onValueChange={(value) => dispatch(lessonsTranslateSwitch(value))}
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  coverView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 17,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default TabPracticeWordsHeaderModal;
