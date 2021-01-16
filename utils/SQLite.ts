import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function loadDatabaseFromUri(uri: string) {
  const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, {
      intermediates: true,
    });
  }

  await FileSystem.downloadAsync(
    Asset.fromModule(uri).uri,
    `${FileSystem.documentDirectory}SQLite/database.db`,
  );
}
