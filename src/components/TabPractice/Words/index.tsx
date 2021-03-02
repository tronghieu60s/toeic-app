import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WordItem from '~/src/components/TabPractice/Words/WordItem';
import { View } from '~/src/components/Themed';
import ScreenLoading from '~/src/components/UI/ScreenLoading';
import { actLoadWordsGroup, actToggleFlashWord } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabPracticeParamList, WordType } from '~/types';
import { AdMobBanner } from '../../Ads';
import ScreenEmpty from '../../UI/ScreenEmpty';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

export default memo(function TabPracticeWords(props: Props) {
  const { route, navigation } = props;
  const { group } = route.params;
  const [isPending, setIsPending] = useState(true);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.words);

  useEffect(() => {
    (async () => {
      await dispatch(actLoadWordsGroup(group));
      setIsPending(false);
    })();
  }, []);

  const handleFlashWord = (word: WordType) => dispatch(actToggleFlashWord(word));
  const handleDetailsWord = (word: WordType) => {
    navigation.navigate('TabPracticeWordDetails', { word });
  };

  const renderItem = ({ item, index }: { item: WordType; index: number }) => (
    <>
      {index === 0 && <AdMobBanner light bannerSize="largeBanner" style={tailwind('mb-2')} />}
      <WordItem
        word={item}
        handleFlashWord={handleFlashWord}
        handleDetailsWord={handleDetailsWord}
      />
    </>
  );

  const text = 'Bài học này đang cập nhật từ mới.\nVui lòng quay lại sau.';
  if (isPending) return <ScreenLoading />;
  if (words.length <= 0 && !isPending) return <ScreenEmpty>{text}</ScreenEmpty>;

  return (
    <View light style={tailwind('flex-1 px-2')}>
      <FlatList
        data={words}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind('pt-2 pb-1')}
      />
    </View>
  );
});
