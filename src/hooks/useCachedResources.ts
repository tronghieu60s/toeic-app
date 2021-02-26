import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { executeSql, initDbTable, loadDataFromResources } from '~/src/utils/SQLite';
import { delayLoading } from '../helpers/common';

type ReturnValue = {
  isLoadingComplete: boolean;
  processText: string;
};

export default function useCachedResources(): ReturnValue {
  const [processText, setProcessText] = React.useState('');
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
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
        const firstLoading = await AsyncStorage.getItem('@first_loading');
        if (firstLoading !== 'true') {
          await executeSql('drop table groups;');
          await executeSql('drop table words;');
          await initDbTable();

          await loadDataFromResources();
          await AsyncStorage.setItem('@first_loading', 'true');
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
