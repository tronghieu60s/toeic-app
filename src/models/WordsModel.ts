import { ExecuteSQL, executeSql } from '~/src/utils/SQLite';
import Config from '../constants/Config';

const { count_max } = Config.study;

export const getWordsByIdGroup = (id_group: number): Promise<ExecuteSQL> => {
  return executeSql(
    `select * from words 
  left join groups on groups.id_group = words.id_group 
  left join studies on studies.id_study = words.id_word
  where words.id_group = ?`,
    [id_group],
  );
};

export const getWordsByIdWord = (id_word: number): Promise<ExecuteSQL> => {
  return executeSql(
    `select * from words 
  left join groups on groups.id_group = words.id_group 
  left join studies on studies.id_study = words.id_word
  where words.id_word = ?`,
    [id_word],
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

export const getWordsNonDifficultStudied = (): Promise<ExecuteSQL> => {
  return executeSql(
    `select * from words 
  left join groups on groups.id_group = words.id_group 
  left join studies on studies.id_study = words.id_word
  where studies.count_study = ${count_max} and (studies.difficult_study = 0 or studies.difficult_study is null)`,
    [],
  );
};

export const getWordsByNameOrMean = (str: string, limit: number): Promise<ExecuteSQL> => {
  const key = str.replace(
    /[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi,
    '',
  );
  return executeSql(
    `select * from words 
    left join groups on groups.id_group = words.id_group 
    left join studies on studies.id_study = words.id_word
    where words.name_word like '%${key}%' or 
    words.mean_word like '%${key}%' 
    order by words.name_word 
    limit ?`,
    [limit],
  );
};
