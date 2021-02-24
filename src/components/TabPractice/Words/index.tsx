import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WordItem from '~/src/components/TabPractice/Words/WordItem';
import { View } from '~/src/components/Themed';
import ScreenCenter from '~/src/components/UI/ScreenCenter';
import ScreenLoading from '~/src/components/UI/ScreenLoading';
import { actLoadWordsGroup, actToggleFlashWord } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabPracticeParamList, WordType } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWords = memo((props: Props) => {
  const [isPending, setIsPending] = useState(true);
  const { route, navigation } = props;
  const { group } = route.params;

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.words);

  useEffect(() => {
    (async () => {
      await dispatch(actLoadWordsGroup(group));
      setIsPending(false);
    })();
  }, []);

  const renderItem = ({ item }: { item: WordType }) => (
    <WordItem word={item} handleFlashWord={handleFlashWord} handleDetailsWord={handleDetailsWord} />
  );

  const handleFlashWord = (word: WordType) => dispatch(actToggleFlashWord(word));
  const handleDetailsWord = (word: WordType) =>
    navigation.navigate('TabPracticeWordDetails', { word });

  const text = 'Bài học này đang cập nhật. Vui lòng quay lại sau.';
  if (isPending) return <ScreenLoading />;
  if (words.length <= 0 && !isPending) return <ScreenCenter>{text}</ScreenCenter>;

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

export default TabPracticeWords;
