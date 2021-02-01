import { executeSql } from '~/src/utils/SQLite';

export const getGroups = () => executeSql('select * from groups');
