import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '~/src/redux/store';
import FlashScreen from './src/components/Common/FlashScreen';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

export default function App(): JSX.Element {
  const { isLoadingComplete, processText } = useCachedResources();

  if (!isLoadingComplete) {
    return <FlashScreen processText={processText} />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}
