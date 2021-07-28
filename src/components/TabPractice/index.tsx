import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import TabSettingStatisticsMini from '~/src/components/TabSetting/Statistics/StatisticsMini';
import { GroupTypeRender } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabPracticeParamList } from '~/types';
import { Ripple, ScrollView, Text, View } from '../Themed';
import ScreenEmpty from '../UI/ScreenEmpty';
import GroupItem from './GroupItem';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default memo(function TabPractice(props: Props) {
  const { navigation } = props;
  const groups = useSelector((state: RootState) => state.practice.groups);

  const renderItems = (groups: GroupTypeRender[]) => {
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
        <Ripple
          onPress={() => navigation.navigate('TabPracticeAlert')}
          style={tailwind('rounded-lg flex-row justify-between items-center p-3 mt-2 mx-3')}
        >
          <Text weight={700} style={tailwind('text-sm text-blue-700 tracking-wide')}>
            🔹 Thông báo của tác giả về ứng dụng.
          </Text>
          <AntDesign name="right" size={15} color="black" />
        </Ripple>
        <View light style={tailwind('flex-1 flex-row flex-wrap justify-center mt-2')}>
          {renderItems(groups)}
        </View>
      </View>
    </ScrollView>
  );
});
