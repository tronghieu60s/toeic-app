import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import TabSettingStatisticsMini from '~/src/components/TabSetting/Statistics/StatisticsMini';
import { getGroups } from '~/src/models/GroupsModel';
import tailwind from '~/tailwind';
import { GroupType, TabPracticeParamList } from '~/types';
import { ScrollView, View } from '../Themed';
import ScreenEmpty from '../UI/ScreenEmpty';
import ScreenLoading from '../UI/ScreenLoading';
import GroupItem from './GroupItem';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default memo(function TabPractice(props: Props) {
  const { navigation } = props;
  const [isPending, setIsPending] = useState(true);
  const [groups, setGroups] = useState<GroupType[]>([]);

  useEffect(() => {
    (async () => {
      const groups = await getGroups();
      if (groups.data !== null) setGroups(groups.data);
      setIsPending(false);
    })();
  }, []);

  const renderItems = (groups: GroupType[]) => {
    return groups.map((item, index) => (
      <GroupItem key={index} group={item} navigation={navigation} />
    ));
  };

  const text = 'Không tải được dữ liệu,\nvui lòng xóa dữ liệu và khởi động lại ứng dụng.';
  if (isPending) return <ScreenLoading />;
  if (groups.length <= 0) return <ScreenEmpty>{text}</ScreenEmpty>;

  return (
    <ScrollView light style={tailwind('flex-1')}>
      <View light style={tailwind('pb-14')}>
        <TabSettingStatisticsMini />
        <View light style={tailwind('flex-1 flex-row flex-wrap justify-center mt-2')}>
          {renderItems(groups)}
        </View>
      </View>
    </ScrollView>
  );
});
