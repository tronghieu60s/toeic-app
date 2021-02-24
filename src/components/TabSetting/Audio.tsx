import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';
import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setVoiceIdentify, setVoicePitch, setVoiceRate } from '~/src/redux/actions/commonAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { Ripple, View } from '../Themed';
import SelectText from '../UI/SelectText';

const TabSettingAudio = React.memo(() => {
  const [voices, setVoices] = useState<Speech.Voice[]>([]);

  const dispatch = useDispatch();
  const common = useSelector((state: RootState) => state.common);
  const { voiceIdentify, voiceRate, voicePitch } = common;

  const loadNameAudio = async () => {
    let voices = await Speech.getAvailableVoicesAsync();
    voices = voices.filter((o) => o.identifier.slice(0, 2) === 'en');
    voices.sort((a, b) => (a.language > b.language ? 1 : -1));
    setVoices(voices);
    ToastAndroid.show('Đã tải dữ liệu.', ToastAndroid.SHORT);
  };

  const renderItemsSelect = (voices: Speech.Voice[]) =>
    voices.map((o, index) => (
      <Picker.Item key={index} label={`${o.language} | ${o.identifier}`} value={o.identifier} />
    ));

  return (
    <>
      <View style={tailwind('justify-between mb-2')}>
        <SelectText
          name="Giọng Nói Tiếng Anh"
          description="Tải dữ liệu trước khi chọn giọng nói bạn muốn."
        />
        <View style={tailwind('flex-row justify-around items-center')}>
          <Ripple style={tailwind('p-2')} onPress={loadNameAudio}>
            <Feather name="download" size={20} color="black" />
          </Ripple>
          <Picker
            style={tailwind('w-10/12')}
            selectedValue={voiceIdentify}
            onValueChange={(itemValue) => dispatch(setVoiceIdentify(itemValue))}
          >
            {renderItemsSelect(voices)}
          </Picker>
        </View>
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
    </>
  );
});

export default TabSettingAudio;
