import { AntDesign, Entypo, FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import React, { memo, useState } from 'react';
import { Share, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Ripple, ScrollView, Text, View } from '~/src/components/Themed';
import { SpeechEnglish } from '~/src/helpers/sound';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabSettingParamList } from '~/types';
import ContentBlock from '../UI/ContentBlock';
import TabSettingAudio from './Audio';
import TabSettingVisible from './Visible';

type LinkingProps = {
  title: string;
  children: JSX.Element;
  onPress: () => void;
};

type Props = {
  navigation: StackNavigationProp<TabSettingParamList, 'TabSettingScreen'>;
};

export default memo(function TabSetting({ navigation }: Props) {
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
      <View light style={tailwind('pb-2')}>
        <ContentBlock title="Cài Đặt Hiển Thị">
          <TabSettingVisible />
        </ContentBlock>
        <ContentBlock title="Cài Đặt Âm Thanh">
          <View>
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
        </ContentBlock>
        <ContentBlock title="Cộng Đồng">
          <View>
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
              <MaterialIcons name="message" size={22} color="#5e72e4" />
            </LinkingBlock>
            <LinkingBlock title="Chia sẻ" onPress={onShare}>
              <Entypo name="share" size={22} color="#5e72e4" />
            </LinkingBlock>
          </View>
        </ContentBlock>
        <ContentBlock title="Khác">
          {/* <NormalBlock
            title="Dữ liệu học tập"
            onPress={}
          />
          <NormalBlock
            title="Sao lưu và khôi phục"
            onPress={}
          /> */}
          <NormalBlock
            title="Thông tin ứng dụng"
            onPress={() => navigation.navigate('TabSettingAppDetails')}
          />
        </ContentBlock>
      </View>
    </ScrollView>
  );
});

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

function NormalBlock(props: { title: string; onPress: () => void }) {
  const { title, onPress } = props;

  return (
    <Ripple
      rippleCentered={false}
      rippleContainerBorderRadius={0}
      style={tailwind('flex-row justify-between items-center py-3')}
      onPress={onPress}
    >
      <Text weight={600} style={tailwind('ml-2')}>
        {title}
      </Text>
      <AntDesign name="right" size={15} color="black" />
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
