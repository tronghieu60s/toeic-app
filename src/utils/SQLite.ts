/* eslint-disable arrow-body-style */
import { openDatabase } from 'expo-sqlite';
import { Alert } from 'react-native';
import { GroupType, WordType } from '~/types';
import apiCaller from './ApiCaller';

const db = openDatabase('database.db');

type ExecuteSQL = {
  data: any[];
  insertId: number;
  rowsAffected: number;
};

export const executeSql = (sql: string, params: any = []): Promise<ExecuteSQL> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, { rows, insertId, rowsAffected }) => {
          const { _array } = rows;
          const data = _array.length === 0 ? null : _array;
          const result: ExecuteSQL = {
            data,
            insertId,
            rowsAffected,
          };
          resolve(result);
        },
        (_, err) => {
          console.log(err);
          Alert.alert(`${err}`);
          return false;
        },
      );
    });
  });
};

// ----

export const initDbTable = async () => {
  await executeSql(
    `create table if not exists options (
    id_option integer primary key not null, 
    name_option text, 
    value_option text
    );`,
  );
  await executeSql(
    `create table if not exists groups (
    id_group integer primary key not null, 
    name_group text, 
    pronounce_group text,
    mean_group text,
    image_group text
    );`,
  );
  await executeSql(
    `create table if not exists words (
    id_word integer primary key not null, 
    name_word text, 
    pronounce_word text,
    explain_word text,
    mean_word text,
    id_group integer,
    foreign key(id_group) references groups(id_group)
    );`,
  );
  await executeSql(
    `create table if not exists studies (
    id_study integer primary key not null, 
    count_study integer,
    difficult_study integer,
    foreign key(id_study) references words(id_word)
    );`,
  );
};

export const isNewVersionDatabase = () => {
  return executeSql('select * from options where id_option = 1').then((option) => {
    if (option.data !== null) {
      // Call Api Get Version DB
      return apiCaller('db.json').then((data) => {
        const baseVer = parseInt(option.data[0].value_option.replace(/\./g, ''), 10);
        const newVer = parseInt(data.version.replace(/\./g, ''), 10);
        if (newVer > baseVer) {
          executeSql(
            `update options
        set value_option = ?
        where id_option = 1`,
            [data.version],
          );
          return true;
        }
        return false;
      });
    }
    executeSql(
      `insert into
      options(id_option, name_option, value_option)
      values (1, ?, ?)`,
      ['version_db', '1.0.0'],
    );
    return true;
  });
};

const loadDataGroupsFromApi = async () => {
  await apiCaller('groups.json').then((groups) => {
    if (groups !== null) {
      let sqlValue = `insert into groups
        (id_group, name_group, pronounce_group, mean_group, image_group)
        values`;
      groups.forEach((group: GroupType, index: number) => {
        // Loop Add Sql Value
        sqlValue += `(${group.id_group}, "${group.name_group}",
            "${group.pronounce_group}", "${group.mean_group}", "${group.image_group}")`;
        sqlValue += index === groups.length - 1 ? ';' : ',';
      });
      executeSql(sqlValue);
    }
  });
};

const loadDataWordsFromApi = async () => {
  await apiCaller('words.json').then((words) => {
    if (words !== null) {
      let sqlValue = `insert into words
        (id_word, name_word, pronounce_word, explain_word, mean_word, id_group)
        values`;
      words.forEach((word: WordType, index: number) => {
        // Loop Add Sql Value
        sqlValue += `(${word.id_word}, "${word.name_word}",
            "${word.pronounce_word}", "${word.explain_word}", 
            "${word.mean_word}", ${word.id_group})`;
        sqlValue += index === words.length - 1 ? ';' : ',';
      });
      executeSql(sqlValue);
    }
  });
};

export const loadDataFromApi = async () => {
  await loadDataGroupsFromApi();
  await loadDataWordsFromApi();
};

// ----
