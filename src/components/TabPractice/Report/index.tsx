import { RouteProp } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import React, { memo, useState } from 'react';
import { Button, StyleSheet, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tailwind from '~/tailwind';
import { TabPracticeParamList } from '~/types';
import { ScrollView, Text, View } from '../../Themed';
import SwitchCustom from '../../UI/SwitchCustom';

const { version_data } = require('~/src/resources/config');

const listBugState = [
  'Sai chính tả',
  'Đáp án không đúng',
  'Lỗi hệ thống',
  'Phát âm bị lỗi',
  'Giao diện bị lỗi',
];

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeReport'>;
};

export default memo(function TabPracticeReport({ route }: Props) {
  const { word } = route.params;
  const [text, onChangeText] = React.useState('');
  const [listBug, setListBug] = useState(() => {
    return listBugState.map((o) => ({ name: o, value: false }));
  });

  const onChangeSwitch = (name: string) => {
    const newListBug = listBug.map((o) => {
      if (o.name === name) return { name, value: !o.value };
      return o;
    });
    setListBug(newListBug);
  };

  const onPressSendReport = () => {
    let textBug = listBug.map((o) => (o.value ? o.name : ''));
    textBug = textBug.filter((o) => (o.length > 0 ? o : null));
    if (textBug.length <= 0) {
      ToastAndroid.show('Bạn chưa chọn lỗi xảy ra.', ToastAndroid.SHORT);
      return;
    }

    const subject = `[BUG - TOEIC ESSENTIAL WORDS] - Báo Lỗi Từ ${word.name_word?.toUpperCase()}`;
    const body = `- Thiết bị: ${Constants.deviceName}<br>
    - Thiết bị nhận dạng: ${Constants.installationId}<br>
    - Phiên bản ứng dụng cơ sở: ${Constants.manifest.version}<br>
    - Phiên bản dữ liệu ứng dụng: ${version_data}<br><br>
    - Từ vựng: [${word.name_group}] ${word.name_word} - ${word.mean_word}<br>
    - Lỗi: ${textBug.join(', ')}<br>
    - Nội dung chi tiết: ${text}`;
    Linking.openURL(`mailto:estudy.techapp@gmail.com?subject=${subject}&body=${body}`);
  };

  const textHead = `${word.name_word?.toUpperCase()}\n${word.mean_word}`;
  return (
    <ScrollView style={tailwind('px-4 pt-4')}>
      <Text weight={700} style={{ ...tailwind('text-sm text-center mb-5'), color: '#5e72e4' }}>
        {textHead}
      </Text>
      <View style={tailwind('mb-4')}>
        {listBug.map((o, i) => {
          return (
            <SwitchCustom
              key={i}
              name={o.name}
              value={o.value}
              onValueChange={() => onChangeSwitch(o.name)}
            />
          );
        })}
      </View>
      <TextInput
        multiline
        value={text}
        style={styles.input}
        placeholder="Nhập lỗi vào đây..."
        onChangeText={(text) => onChangeText(text)}
      />
      <Text style={tailwind('mt-2')}>
        Chúng tôi đánh giá cao thư báo lỗi của bạn, nếu bạn đóng góp cách sửa lỗi cho từ vựng / hệ
        thống.
      </Text>
      <View style={tailwind('mt-5 items-end')}>
        <View style={tailwind('w-5/12')}>
          <Button title="Gửi Báo Cáo" color="#5e72e4" onPress={onPressSendReport} />
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    height: 150,
    borderColor: '#999999a1',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1.5,
    backgroundColor: '#f4f5f7',
    textAlignVertical: 'top',
  },
});
