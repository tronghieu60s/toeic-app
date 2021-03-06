import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import TabSettingStatisticsMini from '~/src/components/TabSetting/Statistics/StatisticsMini';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { GroupType, TabPracticeParamList } from '~/types';
import { ScrollView, View } from '../Themed';
import ScreenEmpty from '../UI/ScreenEmpty';
import GroupItem from './GroupItem';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default memo(function TabPractice(props: Props) {
  const { navigation } = props;
  const groups = useSelector((state: RootState) => state.practice.groups);

  const renderItems = (groups: GroupType[]) => {
    return groups.map((item, index) => (
      <GroupItem key={index} group={item} navigation={navigation} />
    ));
  };

  const text = 'Không tải được dữ liệu,\nvui lòng xóa dữ liệu và khởi động lại ứng dụng.';
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
