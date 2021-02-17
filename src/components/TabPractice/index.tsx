import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import tailwind from '~/tailwind';
import { getGroups } from '~/src/models/GroupsModel';
import { GroupType, TabPracticeParamList } from '~/types';
import { ScrollView, Text, View } from '../Themed';
import Loading from '../UI/Loading';
import GroupItem from './GroupItem';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const TabPractice = memo((props: Props) => {
  const { navigation } = props;
  const [groups, setGroups] = useState<GroupType[]>([]);

  useEffect(() => {
    (async () => {
      const groups = await getGroups();
      if (groups.data !== null) setGroups(groups.data);
    })();
  }, []);

  const renderGroups = (order: number, limit: number) => {
    const newGroups = groups.slice(order, order + limit);
    let result: React.ReactNode = null;
    result = newGroups.map((group) => {
      const { id_group } = group;
      return <GroupItem key={id_group} group={group} navigation={navigation} />;
    });
    return result;
  };

  if (groups.length <= 0) return <Loading />;

  return (
    <ScrollView light style={tailwind('flex-1 px-2')}>
      <View light style={tailwind('pb-14')}>
        <Text weight={700} style={styles.groupsTitle}>
          General Business
        </Text>
        <View light style={styles.groups}>
          {renderGroups(0, 5)}
        </View>
        <Text weight={700} style={styles.groupsTitle}>
          Office Issues
        </Text>
        <View light style={styles.groups}>
          {renderGroups(5, 10)}
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  groups: {
    ...tailwind('flex-1 flex-row flex-wrap justify-between'),
    width: Dimensions.get('window').width - 10,
  },
  groupsTitle: { ...tailwind('text-lg my-2 ml-2') },
});

export default TabPractice;
