import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import * as React from 'react';
import { ToastAndroid } from 'react-native';
import { executeSql, initDbTable, loadDataFromResources } from '~/src/utils/SQLite';
import { delayLoading } from '../helpers/common';
import { SpeechEnglish } from '../helpers/sound';

type ReturnValue = {
  isLoadingComplete: boolean;
  processText: string;
};

const { version_data } = require('~/src/resources/config');

export default function useCachedResources(): ReturnValue {
  const [processText, setProcessText] = React.useState('');
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        setProcessText('Đang kiểm tra cập nhật...');

        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            setProcessText('Đã tìm thấy bản cập nhật mới...');
            await delayLoading();
            setProcessText('Đang cập nhật...');

            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          } else setProcessText('Không tìm thấy bản cập nhật nào...');
        } catch (e) {
          await delayLoading();
          setProcessText('Không thể kết nối với máy chủ...');
        }

        await delayLoading();
        setProcessText('Đang khởi tạo dữ liệu...');

        // Load Fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('~/assets/fonts/SpaceMono-Regular.ttf'),
          'san-300': require('~/assets/fonts/OpenSans-Light.ttf'),
          'san-400': require('~/assets/fonts/OpenSans-Regular.ttf'),
          'san-600': require('~/assets/fonts/OpenSans-SemiBold.ttf'),
          'san-700': require('~/assets/fonts/OpenSans-Bold.ttf'),
          'san-800': require('~/assets/fonts/OpenSans-ExtraBold.ttf'),
        });

        // Load Database
        await initDbTable();
        // Init Sound Speech
        await SpeechEnglish('');
        const previousVersion = (await AsyncStorage.getItem('@previous_version')) || '0';
        const previousVersionNum = parseInt(previousVersion, 10);
        const newVersionDataNum = parseInt(version_data, 10);

        console.log(`${newVersionDataNum} - ${previousVersionNum}`);
        if (newVersionDataNum !== previousVersionNum) {
          console.log('New Data. Downloading...');
          await executeSql('drop table groups;');
          await executeSql('drop table words;');
          await initDbTable();

          await loadDataFromResources();
          await AsyncStorage.setItem('@previous_version', version_data);
          ToastAndroid.show('Đã cập nhật dữ liệu mới nhất!', ToastAndroid.SHORT);
        }
        await delayLoading();

        SplashScreen.preventAutoHideAsync();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete, processText };
}
