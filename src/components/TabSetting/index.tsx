import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Ripple, ScrollView, Text, View } from '~/src/components/Themed';
import { SpeechEnglish } from '~/src/helpers/sound';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import TabSettingAudio from './Audio';
import TabSettingVisible from './Visible';

const TabSetting = React.memo(() => {
  const [textVoice, setTextVoice] = useState('Hello, I am a Robot!');

  const common = useSelector((state: RootState) => state.common);
  const { voiceIdentify, voiceRate, voicePitch } = common;

  const onPressSpeechButton = () => {
    SpeechEnglish(textVoice, {
      voice: voiceIdentify,
      rate: voiceRate,
      pitch: voicePitch,
    });
  };

  return (
    <ScrollView light style={tailwind('p-2')}>
      <View light style={tailwind('pb-14')}>
        <View style={tailwind('p-3 rounded-lg mb-3')}>
          <TitleModal>Cài Đặt Hiển Thị</TitleModal>
          <TabSettingVisible />
        </View>
        <View style={tailwind('p-3 rounded-lg mb-3')}>
          <TitleModal>Cài Đặt Âm Thanh</TitleModal>
          <View style={tailwind('flex-row items-center mb-2')}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTextVoice(text)}
              value={textVoice}
            />
            <Ripple style={tailwind('p-2')} onPress={onPressSpeechButton}>
              <SimpleLineIcons name="volume-2" size={17} color="black" />
            </Ripple>
          </View>
          <TabSettingAudio />
        </View>
      </View>
    </ScrollView>
  );
});

const TitleModal = ({ children }: { children: string }) => (
  <Text weight={700} style={{ ...tailwind('mb-4'), fontSize: 13, color: '#5e72e4' }}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  input: {
    ...tailwind('w-7/12 h-8 border px-2'),
    borderColor: '#dee2e6',
    borderRadius: 5,
  },
});

export default TabSetting;
