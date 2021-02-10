import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '~/src/redux/store';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

export default function App(): JSX.Element {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) return <View />;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}
