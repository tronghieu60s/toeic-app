import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '~/redux/store';
import { View } from './components/Themed';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { loadDatabaseFromUri } from './utils/SQLite';

loadDatabaseFromUri(require('~/resource/database.db'));

export default function App(): JSX.Element {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <View />;
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
