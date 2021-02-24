import { SimpleLineIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Ripple, Text, View, ScrollView } from '~/src/components/Themed';
import SelectText from '~/src/components/UI/SelectText';
import Switch from '~/src/components/UI/Switch';
import { SpeechEnglish } from '~/src/helpers/sound';
import {
  setVoiceIdentify,
  setVoicePitch,
  setVoiceRate,
  toggleExplain,
  toggleMean,
  togglePronounce,
} from '~/src/redux/actions/commonAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';

const TabSetting = React.memo(() => {
  const [textVoice, setTextVoice] = useState('Hello, I am a Robot!');
  const [voices, setVoices] = useState<Speech.Voice[]>([]);

  const dispatch = useDispatch();
  const common = useSelector((state: RootState) => state.common);
  const {
    visibleMean,
    visibleExplain,
    visiblePronounce,
    voiceIdentify,
    voiceRate,
    voicePitch,
  } = common;

  useEffect(() => {
    (async () => {
      let voices = await Speech.getAvailableVoicesAsync();
      voices = voices.filter((o) => o.identifier.slice(0, 2) === 'en');
      voices.sort((a, b) => (a.language > b.language ? 1 : -1));
      setVoices(voices);
    })();
  }, []);

  const onPressSpeechButton = () => {
    SpeechEnglish(textVoice, {
      voice: voiceIdentify,
      rate: voiceRate,
      pitch: voicePitch,
    });
  };

  const renderItemsSelect = (voices: Speech.Voice[]) =>
    voices.map((o, index) => (
      <Picker.Item key={index} label={`${o.language} | ${o.identifier}`} value={o.identifier} />
    ));

  return (
    <ScrollView light style={tailwind('p-2')}>
      <View light style={tailwind('pb-16')}>
        <View style={tailwind('p-3 rounded-lg mb-3')}>
          <TitleModal>Cài Đặt Hiển Thị</TitleModal>
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
          <View style={tailwind('justify-between mb-2')}>
            <SelectText
              name="Giọng Nói Tiếng Anh"
              description="Lựa chọn giọng nói bạn mong muốn."
            />
            <Picker
              selectedValue={voiceIdentify}
              onValueChange={(itemValue) => dispatch(setVoiceIdentify(itemValue))}
            >
              {renderItemsSelect(voices)}
            </Picker>
          </View>
          <View style={tailwind('justify-between')}>
            <SelectText
              name="Tốc Độ Của Giọng Nói"
              description={`Tốc độ của giọng nói hiện tại là ${voiceRate.toFixed(1)}.`}
            />
            <Slider
              style={tailwind('w-full h-5 rounded')}
              value={voiceRate}
              onValueChange={(value) => dispatch(setVoiceRate(parseFloat(value.toFixed(1))))}
              minimumValue={0.1}
              maximumValue={2}
              thumbTintColor="#5e72e4"
              minimumTrackTintColor="#5e72e4"
              maximumTrackTintColor="#525f7f"
            />
          </View>
          <View style={tailwind('justify-between')}>
            <SelectText
              name="Cao Độ Của Giọng Nói"
              description={`Cao độ của giọng nói hiện tại là ${voicePitch.toFixed(1)}.`}
            />
            <Slider
              style={tailwind('w-full h-5 rounded')}
              value={voicePitch}
              onValueChange={(value) => dispatch(setVoicePitch(parseFloat(value.toFixed(1))))}
              minimumValue={0.1}
              maximumValue={2}
              thumbTintColor="#5e72e4"
              minimumTrackTintColor="#5e72e4"
              maximumTrackTintColor="#525f7f"
            />
          </View>
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
