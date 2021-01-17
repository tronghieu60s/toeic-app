/* eslint-disable arrow-body-style */
import { GroupType } from '~/types';
import { executeSql } from '~/utils/SQLite';

// eslint-disable-next-line import/prefer-default-export
export const getWordsByIdGroup = ({ id_group }: GroupType) => {
  return executeSql(
    `select * from words 
  left join groups on groups.id_group = words.id_group 
  left join studies on studies.id_study = words.id_word
  where words.id_group = ?`,
    [id_group],
  );
};
