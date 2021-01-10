import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { GroupType, TabPracticeParamList } from '~/types';
import { ScrollView, Text, View } from '../Themed';
import GroupItem from './GroupItem';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const groups: GroupType[string][] = _.values(require('~/resource/groups'));

const TabPractice = memo(({ navigation }: Props) => {
  const renderGroups = (order: number, limit: number) => {
    const newGroups = groups.slice(order, order + limit);
    let result: React.ReactNode = null;
    result = newGroups.map((group, index) => (
      <React.Fragment key={group.name}>
        {index % 2 === 0 && <View style={{ flexBasis: '100%' }} />}
        <GroupItem group={group} navigation={navigation} />
      </React.Fragment>
    ));
    return result;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: '#f3f3f3' }}>
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
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 5,
  },
  groups: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3',
  },
  groupsTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
  },
});

export default TabPractice;
