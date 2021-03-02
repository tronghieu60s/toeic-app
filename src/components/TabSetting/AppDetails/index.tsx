import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import React, { memo } from 'react';
import { Image } from 'react-native';
import tailwind from '~/tailwind';
import { ScrollView, Text, View } from '../../Themed';

const { version_data } = require('~/src/resources/config');

export default memo(function TabSettingAppDetails() {
  const textChannels = `@${
    Constants.manifest.releaseChannel?.toUpperCase() || 'DEVELOPMENT'
  } - 2021`;

  return (
    <ScrollView style={tailwind('h-full bg-white px-7')}>
      <View style={tailwind('items-center mb-6')}>
        <Image style={tailwind('w-28 h-28')} source={require('~/assets/images/icon.png')} />
        <Text
          weight={600}
          style={tailwind('w-9/12 text-base text-center tracking-wider leading-6')}
        >
          Từ Vựng Toeic Cần Thiết - Toeic Essential Words
        </Text>
        <Text style={tailwind('text-xs mt-1')}>{textChannels}</Text>
      </View>
      <View style={tailwind('flex-row items-center mb-1')}>
        <Text weight={700}>Thiết bị:</Text>
        <Text style={tailwind('ml-2 text-sm tracking-widest')}>{Constants.deviceName}</Text>
      </View>
      <View style={tailwind('flex-row items-center mb-1')}>
        <Text weight={700}>Phiên bản ứng dụng cơ sở:</Text>
        <Text style={tailwind('ml-2 text-sm tracking-widest')}>{Constants.manifest.version}</Text>
      </View>
      <View style={tailwind('flex-row items-center mb-1')}>
        <Text weight={700}>Phiên bản dữ liệu ứng dụng:</Text>
        <Text style={tailwind('ml-2 text-sm tracking-widest')}>{version_data}</Text>
      </View>
      <View style={tailwind('flex-row items-center mb-1')}>
        <Text weight={700}>Nhà phát triển:</Text>
        <Text
          style={tailwind('ml-2 text-sm tracking-widest underline text-blue-800')}
          onPress={() => {
            Linking.openURL('https://play.google.com/store/apps/developer?id=EStudy+Tech+App');
          }}
        >
          EStudy Tech App
        </Text>
      </View>
    </ScrollView>
  );
});
