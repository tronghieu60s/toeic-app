import { StackNavigationProp } from '@react-navigation/stack';
import { isNull } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import { getGroups } from '~/src/models/GroupsModel';
import { GroupType, TabPracticeParamList } from '~/types';
import { ScrollView, Text, View } from '../Themed';
import Loading from '../UI/Loading';
import GroupItem from './GroupItem';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const TabPractice = memo(({ navigation }: Props) => {
  const [groups, setGroups] = useState<GroupType[]>([]);

  useEffect(() => {
    (async () => {
      const groups = await getGroups();
      if (!isNull(groups.data)) setGroups(groups.data);
    })();
  }, []);

  const renderGroups = (order: number, limit: number) => {
    const newGroups = groups.slice(order, order + limit);
    let result: React.ReactNode = null;
    result = newGroups.map((group) => (
      <GroupItem key={group.id_group} group={group} navigation={navigation} />
    ));
    return result;
  };

  if (groups.length <= 0) return <Loading />;

  return (
    <ScrollView style={tailwind('flex-1 bg-gray-200 px-2')}>
      <View style={tailwind('bg-gray-200 pb-14')}>
        <Text weight={700} style={styles.groupsTitle}>
          General Business
        </Text>
        <View style={styles.groups}>{renderGroups(0, 5)}</View>
        <Text weight={700} style={styles.groupsTitle}>
          Office Issues
        </Text>
        <View style={styles.groups}>{renderGroups(5, 10)}</View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  groups: {
    ...tailwind('flex-1 flex-row flex-wrap justify-between bg-gray-200'),
    width: Dimensions.get('window').width - 10,
  },
  groupsTitle: { ...tailwind('text-lg my-3 ml-2') },
});

export default TabPractice;
