/* eslint-disable arrow-body-style */
import { StudyType } from '~/types';
import { executeSql } from '~/src/utils/SQLite';

export const createStudies = (parameters: StudyType) => {
  const { id_study, count_study, difficult_study } = parameters;
  return executeSql('insert into studies(id_study, count_study, difficult_study) values(?, ?, ?)', [
    id_study,
    count_study,
    difficult_study,
  ]);
};

export const updateStudies = (parameters: StudyType) => {
  const { id_study, count_study, difficult_study } = parameters;
  return executeSql('update studies set count_study = ?, difficult_study = ? where id_study = ?', [
    count_study,
    difficult_study,
    id_study,
  ]);
};
