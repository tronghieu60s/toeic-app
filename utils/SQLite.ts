/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable arrow-body-style */
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('database.db');

export const loadDatabaseFromUri = async (uri: string) => {
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
};

type ExecuteSQL = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  insertId: number;
  rowsAffected: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeSql = async (sql: string, params: any = []): Promise<ExecuteSQL> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(sql, params, (_, { rows, insertId, rowsAffected }) => {
        const result: ExecuteSQL = {
          data: rows._array,
          insertId,
          rowsAffected,
        };
        resolve(result);
      });
    });
  });
};
