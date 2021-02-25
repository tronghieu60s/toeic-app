import { GroupType } from '~/types';
import { ExecuteSQL, executeSql } from '~/src/utils/SQLite';

export const getWordsByIdGroup = ({ id_group }: GroupType): Promise<ExecuteSQL> => {
  return executeSql(
    `select * from words 
  left join groups on groups.id_group = words.id_group 
  left join studies on studies.id_study = words.id_word
  where words.id_group = ?`,
    [id_group],
  );
};

export const getWordsDifficult = (): Promise<ExecuteSQL> => {
  return executeSql(
    `select * from words 
  left join groups on groups.id_group = words.id_group 
  left join studies on studies.id_study = words.id_word
  where studies.difficult_study > 0`,
    [],
  );
};
