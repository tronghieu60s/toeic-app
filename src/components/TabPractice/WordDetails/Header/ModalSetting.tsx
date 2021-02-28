import React, { memo } from 'react';
import TabSettingAudio from '~/src/components/TabSetting/Audio';
import { View } from '~/src/components/Themed';
import Modal from '~/src/components/UI/Modal';
import tailwind from '~/tailwind';

type Props = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export default memo(function TabPracticeWordDetailsHeaderModalSetting(props: Props) {
  return (
    <Modal {...props}>
      <View style={tailwind('w-11/12 p-5 pb-6 rounded-lg')}>
        <TabSettingAudio />
      </View>
    </Modal>
  );
});
