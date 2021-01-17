import { executeSql } from '~/utils/SQLite';

export const getGroups = () => executeSql('select * from groups');
