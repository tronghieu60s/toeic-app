import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { memo, useState } from 'react';
import { Share, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Ripple, ScrollView, Text, View } from '~/src/components/Themed';
import { SpeechEnglish } from '~/src/helpers/sound';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import TabSettingAudio from './Audio';
import TabSettingVisible from './Visible';

type LinkingProps = {
  title: string;
  children: JSX.Element;
  onPress: () => void;
};

export default memo(function TabSetting() {
  const [textVoice, setTextVoice] = useState('Hello, I am a Robot!');

  const common = useSelector((state: RootState) => state.common);
  const { voiceIdentify, voiceRate, voicePitch } = common;

  const onShare = async () => {
    const message = 'https://play.google.com/store/apps/details?id=com.tronghieuit.toeicew';
    await Share.share({ message });
  };

  const onPressSpeechButton = () => {
    SpeechEnglish(textVoice, {
      voice: voiceIdentify,
      rate: voiceRate,
      pitch: voicePitch,
    });
  };

  return (
    <ScrollView light style={tailwind('p-2')}>
      <View light style={tailwind('pb-16')}>
        <View style={tailwind('p-3 rounded-lg mb-2')}>
          <TitleModal>Cài Đặt Hiển Thị</TitleModal>
          <TabSettingVisible />
        </View>
        <View style={tailwind('p-3 rounded-lg mb-2')}>
          <TitleModal>Cài Đặt Âm Thanh</TitleModal>
          <View style={tailwind('flex-row justify-center items-center my-2')}>
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
        <View style={tailwind('p-3 rounded-lg mb-2')}>
          <TitleModal>Cộng Đồng</TitleModal>
          <LinkingBlock
            title="Đánh giá ứng dụng 5 sao"
            onPress={() => {
              return Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.tronghieuit.toeicew',
              );
            }}
          >
            <FontAwesome name="star" size={23} color="#5e72e4" />
          </LinkingBlock>
          <LinkingBlock
            title="Phản hồi"
            onPress={() => {
              return Linking.openURL('mailto:estudy.techapp@gmail.com');
            }}
          >
            <Ionicons name="md-chatboxes" size={24} color="#5e72e4" />
          </LinkingBlock>
          <LinkingBlock title="Chia sẻ" onPress={onShare}>
            <Ionicons name="md-share" size={24} color="#5e72e4" />
          </LinkingBlock>
        </View>
      </View>
    </ScrollView>
  );
});

function TitleModal({ children }: { children: string }) {
  return (
    <Text weight={700} style={{ ...tailwind('mb-4'), fontSize: 13, color: '#5e72e4' }}>
      {children}
    </Text>
  );
}

function LinkingBlock(props: LinkingProps) {
  const { title, onPress, children } = props;

  return (
    <Ripple rippleCentered={false} style={tailwind('flex-row items-center py-3')} onPress={onPress}>
      <View>{children}</View>
      <Text weight={700} style={tailwind('ml-2')}>
        {title}
      </Text>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  input: {
    ...tailwind('w-8/12 h-10 border px-4'),
    borderColor: '#dee2e6',
    borderRadius: 5,
  },
});
