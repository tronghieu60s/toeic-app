import React, { memo } from 'react';
import TabSettingAudio from '~/src/components/TabSetting/Audio';
import { Text, View } from '~/src/components/Themed';
import Modal from '~/src/components/UI/Modal';
import tailwind from '~/tailwind';

type Props = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export default memo(function TabPracticeWordDetailsHeaderModalSetting(props: Props) {
  return (
    <Modal {...props}>
      <View style={tailwind('w-11/12 p-5 rounded-lg')}>
        <Text weight={600} style={tailwind('text-center text-base mb-2')}>
          Cài Đặt Âm thanh
        </Text>
        <TabSettingAudio />
      </View>
    </Modal>
  );
});
