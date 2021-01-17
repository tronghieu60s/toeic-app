/* eslint-disable arrow-body-style */
import { StudyType } from '~/types';
import { executeSql } from '~/utils/SQLite';

export const createStudies = ({ id_study, count_study }: StudyType) => {
  return executeSql('insert into studies(id_study, count_study) values(?, ?)', [
    id_study,
    count_study,
  ]);
};

export const updateStudies = ({ id_study, count_study }: StudyType) => {
  return executeSql('update studies set count_study = ? where id_study = ?', [
    count_study,
    id_study,
  ]);
};
