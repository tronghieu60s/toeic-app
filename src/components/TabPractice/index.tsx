import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { getGroups } from '~/src/models/GroupsModel';
import tailwind from '~/tailwind';
import { GroupType, TabPracticeParamList } from '~/types';
import { ScrollView, Text, View } from '../Themed';
import CenterUI from '../UI/Center';
import Loading from '../UI/Loading';
import GroupItem from './GroupItem';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const TabPractice = memo((props: Props) => {
  const [isPending, setIsPending] = useState(true);
  const { navigation } = props;
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [groupsRender, setGroupsRender] = useState<{ title: string; data: GroupType[] }[]>([]);

  useEffect(() => {
    (async () => {
      const groups = await getGroups();
      if (groups.data !== null) setGroups(groups.data);
      setIsPending(false);
    })();
  }, []);

  useEffect(() => {
    const groupsData = [
      {
        title: 'General Business',
        data: groups.slice(0, 5),
      },
      {
        title: 'Office Issues',
        data: groups.slice(5, 10),
      },
    ];
    setGroupsRender(groupsData);
  }, [groups]);

  const renderItems = (groups: { title: string; data: GroupType[] }[]) =>
    groups.map((group, index) => (
      <React.Fragment key={index}>
        <Text weight={700} style={styles.groupsTitle}>
          {group.title}
        </Text>
        <View style={styles.groups}>
          {group.data.map((item, index) => (
            <GroupItem key={index} group={item} navigation={navigation} />
          ))}
        </View>
      </React.Fragment>
    ));

  const text = 'Không có dữ liệu, bạn vui lòng bật Internet và khởi động lại ứng dụng.';
  if (isPending) return <Loading />;
  if (groups.length <= 0) return <CenterUI>{text}</CenterUI>;

  return (
    <ScrollView style={tailwind('flex-1')}>
      <View light style={tailwind('pb-14 px-1')}>
        {renderItems(groupsRender)}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  groups: {
    ...tailwind('flex-1 flex-row flex-wrap justify-between bg-transparent'),
    width: Dimensions.get('window').width - 10,
  },
  groupsTitle: { ...tailwind('text-lg my-2 ml-2') },
});

export default TabPractice;
