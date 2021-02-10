import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { initDatabase } from '~/src/utils/SQLite';

export default function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load Database
        await initDatabase();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('~/assets/fonts/SpaceMono-Regular.ttf'),
          'san-300': require('~/assets/fonts/OpenSans-Light.ttf'),
          'san-400': require('~/assets/fonts/OpenSans-Regular.ttf'),
          'san-600': require('~/assets/fonts/OpenSans-SemiBold.ttf'),
          'san-700': require('~/assets/fonts/OpenSans-Bold.ttf'),
          'san-800': require('~/assets/fonts/OpenSans-ExtraBold.ttf'),
        });

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

  return isLoadingComplete;
}
