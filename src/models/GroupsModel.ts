import { ExecuteSQL, executeSql } from '~/src/utils/SQLite';

// eslint-disable-next-line import/prefer-default-export
export const getGroups = (): Promise<ExecuteSQL> => executeSql('select * from groups');
