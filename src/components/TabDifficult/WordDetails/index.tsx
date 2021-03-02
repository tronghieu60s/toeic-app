import { RouteProp } from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadWordDetails } from '~/src/redux/actions/practiceAction';
import tailwind from '~/tailwind';
import { TabPracticeParamList } from '~/types';
import { AdMobBanner } from '../../Ads';
import StudyWord from '../../TabPractice/WordDetails/DetailsItem';
import { View } from '../../Themed';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

export default memo(function TabDifficultWordDetails(props: Props) {
  const { word } = props.route.params;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadWordDetails(word));
  }, []);

  return (
    <View light style={tailwind('flex-1')}>
      <StudyWord word={word} />
      <View style={tailwind('w-full absolute bottom-0')}>
        <AdMobBanner light bannerSize="banner" />
      </View>
    </View>
  );
});
