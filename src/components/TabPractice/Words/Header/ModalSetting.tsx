import React, { memo } from 'react';
import TabSettingVisible from '~/src/components/TabSetting/Visible';
import { Text, View } from '~/src/components/Themed';
import Modal from '~/src/components/UI/Modal';
import tailwind from '~/tailwind';

type Props = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

export default memo(function TabPracticeWordsHeaderModalSetting(props: Props) {
  return (
    <Modal {...props}>
      <View style={tailwind('w-11/12 p-5 rounded-lg')}>
        <Text weight={600} style={tailwind('text-center text-base mb-2')}>
          Cài Đặt Hiển Thị
        </Text>
        <TabSettingVisible />
      </View>
    </Modal>
  );
});
