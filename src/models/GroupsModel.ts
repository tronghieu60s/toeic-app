import { ExecuteSQL, executeSql } from '~/src/utils/SQLite';
import Config from '../constants/Config';

const { count_max } = Config.study;

// eslint-disable-next-line import/prefer-default-export
export const getGroups = (): Promise<ExecuteSQL> => {
  return executeSql(
    `select groups.*,
      (select count(*) from words 
      left join studies on studies.id_study = words.id_word 
      where words.id_group = groups.id_group and studies.count_study = ${count_max}
      ) AS count_words_complete, 
      (select count(*) from words 
      where words.id_group = groups.id_group
      ) AS count_words 
      from groups`,
    [],
  );
};
