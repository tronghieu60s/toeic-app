import { StudyType } from '~/types';
import { ExecuteSQL, executeSql } from '~/src/utils/SQLite';

export const createStudies = (parameters: StudyType): Promise<ExecuteSQL> => {
  const { id_study, count_study, difficult_study } = parameters;
  return executeSql('insert into studies(id_study, count_study, difficult_study) values(?, ?, ?)', [
    id_study,
    count_study,
    difficult_study,
  ]);
};

export const updateStudies = (parameters: StudyType): Promise<ExecuteSQL> => {
  const { id_study, count_study, difficult_study } = parameters;
  return executeSql('update studies set count_study = ?, difficult_study = ? where id_study = ?', [
    count_study,
    difficult_study,
    id_study,
  ]);
};

export const getWordsStudied = (): Promise<ExecuteSQL> => {
  return executeSql('select * from studies where studies.count_study = 6', []);
};
