import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { executeSql, initDbTable, isNewVersionDatabase, loadDataFromApi } from '~/src/utils/SQLite';
import { delayLoading } from '../helpers/common';

type Props = {
  isLoadingComplete: boolean;
  processNumber: number;
  processText: string;
};

export default function useCachedResources(): Props {
  const [processText, setProcessText] = React.useState('');
  const [processNumber, setProcessNumber] = React.useState(0);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        setProcessText('Đang khởi tạo dữ liệu.');

        // Load Database and Fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('~/assets/fonts/SpaceMono-Regular.ttf'),
          'san-300': require('~/assets/fonts/OpenSans-Light.ttf'),
          'san-400': require('~/assets/fonts/OpenSans-Regular.ttf'),
          'san-600': require('~/assets/fonts/OpenSans-SemiBold.ttf'),
          'san-700': require('~/assets/fonts/OpenSans-Bold.ttf'),
          'san-800': require('~/assets/fonts/OpenSans-ExtraBold.ttf'),
        });
        await initDbTable();

        await delayLoading();
        setProcessNumber(20);
        setProcessText('Đang kiểm tra cập nhật.');

        // Check Update From Server
        const isNew = await isNewVersionDatabase();

        await delayLoading();
        setProcessNumber(40);

        // Check Update
        if (isNew) {
          // Update
          setProcessText('Đã tìm thấy bản cập nhật, đang cập nhật.');
          // Delete All Data Before Load New Data
          await executeSql('drop table groups;');
          await executeSql('drop table words;');
          await initDbTable();

          await delayLoading();
          setProcessNumber(70);
          setProcessText('Đang tải dữ liệu.');

          // Load Data From Api
          await loadDataFromApi();
          await delayLoading();
        } else {
          // Not Update
          setProcessText('Không có bản cập nhật nào.');
        }

        setProcessNumber(100);
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

  return { isLoadingComplete, processNumber, processText };
}
