import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { actLoadWordsDifficult, actToggleFlashWord } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabDifficultParamList, WordType } from '~/types';
import WordItem from '../TabPractice/Words/WordItem';
import { View } from '../Themed';
import CenterUI from '../UI/Center';
import Loading from '../UI/Loading';

type Props = {
  navigation: StackNavigationProp<TabDifficultParamList, 'TabDifficultScreen'>;
};

const TabDifficult = memo(({ navigation }: Props) => {
  const [isPending, setIsPending] = useState(true);
  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.wordsDifficult);

  useEffect(() => {
    (async () => {
      await dispatch(actLoadWordsDifficult());
      setIsPending(false);
    })();
  }, []);

  const renderItem = ({ item }: { item: WordType }) => (
    <WordItem word={item} handleFlashWord={handleFlashWord} handleDetailsWord={handleDetailsWord} />
  );

  const handleFlashWord = (word: WordType) => dispatch(actToggleFlashWord(word));
  const handleDetailsWord = (word: WordType) =>
    navigation.navigate('TabPracticeWordDetails', { word });

  const text = 'Không có từ khó. Bạn đang làm rất tốt ^^.';
  if (isPending) return <Loading />;
  if (words.length <= 0 && !isPending) return <CenterUI>{text}</CenterUI>;

  return (
    <View light style={tailwind('flex-1 px-2')}>
      <FlatList
        data={words}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind('pt-2 pb-14')}
      />
    </View>
  );
});

export default TabDifficult;
