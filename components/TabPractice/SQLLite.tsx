import * as SQLite from 'expo-sqlite';
import React, { memo } from 'react';
import { Button } from 'react-native';
import { loadDatabaseFromUri } from '~/utils/SQLite';
import { View } from '../Themed';

loadDatabaseFromUri(require('~/resource/database.db'));

const db = SQLite.openDatabase('database.db');

const SQLLite = memo(() => {
  const add = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from words', [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
      });
    });
  };

  return (
    <View>
      <Button title="Add" onPress={add} />
    </View>
  );
});

export default SQLLite;
