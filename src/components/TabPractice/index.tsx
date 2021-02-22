import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { getGroups } from '~/src/models/GroupsModel';
import apiCaller from '~/src/utils/ApiCaller';
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
  const [message, setMessage] = useState({ content: '', color: '' });

  const { navigation } = props;
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [groupsRender, setGroupsRender] = useState<{ title: string; data: GroupType[] }[]>([]);

  useEffect(() => {
    (async () => {
      const groups = await getGroups();
      if (groups.data !== null) setGroups(groups.data);

      const data = await apiCaller('config.json');
      if (data) {
        const { message, color_message } = data;
        setMessage({ content: message, color: color_message });
      }

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
      {
        title: 'Personnel',
        data: groups.slice(10, 15),
      },
      {
        title: 'Purchasing',
        data: groups.slice(15, 20),
      },
      {
        title: 'Financing and Budgeting',
        data: groups.slice(20, 25),
      },
      {
        title: 'Management Issues',
        data: groups.slice(25, 30),
      },
      {
        title: 'Restaurants and Events',
        data: groups.slice(30, 35),
      },
      {
        title: 'Travel',
        data: groups.slice(35, 40),
      },
      {
        title: 'Entertainment',
        data: groups.slice(40, 45),
      },
      {
        title: 'Health',
        data: groups.slice(45, 50),
      },
    ];
    setGroupsRender(groupsData);
  }, [groups]);

  const renderItems = (groups: { title: string; data: GroupType[] }[]) =>
    groups.map((group, index) => (
      <React.Fragment key={index}>
        {group.data.length > 0 && (
          <Text weight={700} style={styles.groupsTitle}>
            {group.title}
          </Text>
        )}
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
        {(message.content || '').length > 0 && (
          <View
            style={tailwind(
              `px-4 py-3 mt-3 mx-1 rounded-lg bg-${
                message.color === undefined ? 'blue' : message.color
              }-500`,
            )}
          >
            <Text style={tailwind('text-white')}>
              <Image source={require('~/assets/images/smile.gif')} /> {message.content}
            </Text>
          </View>
        )}
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
