/* eslint-disable arrow-body-style */
import { openDatabase } from 'expo-sqlite';
import { GroupType, WordType } from '~/types';

const groups = require('~/src/resources/groups');
const words = require('~/src/resources/words');

const db = openDatabase('database.db');

export type ExecuteSQL = {
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
          const data = _array.length === 0 ? [] : _array;
          const result: ExecuteSQL = {
            data,
            insertId,
            rowsAffected,
          };
          resolve(result);
        },
        (_, err) => {
          console.log(err);
          // Alert.alert(`${err}`);
          return false;
        },
      );
    });
  });
};

export const initDbTable = async (): Promise<void> => {
  await executeSql(
    `create table if not exists groups (
    id_group integer primary key not null, 
    name_group text, 
    pronounce_group text,
    mean_group text,
    image_group text,
    lock_group integer
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

export const loadDataFromResources = async (): Promise<void> => {
  await loadDataGroupsFromResources();
  await loadDataWordsFromResources();
};

const loadDataGroupsFromResources = async () => {
  let sqlValue = `insert into groups
        (id_group, name_group, pronounce_group, mean_group, image_group, lock_group)
        values`;
  groups.forEach((group: GroupType, index: number) => {
    // Loop Add Sql Value
    sqlValue += `(${group.id_group}, "${group.name_group}",
            "${group.pronounce_group}", "${group.mean_group}", "${group.image_group}", ${index === 0 ? 0 : 1})`;
    sqlValue += index === groups.length - 1 ? ';' : ',';
  });
  await executeSql(sqlValue);
};

const loadDataWordsFromResources = async () => {
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
  await executeSql(sqlValue);
};
