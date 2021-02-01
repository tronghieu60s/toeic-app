import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import CommonWordItem from '~/src/components/Common/WordItem';
import { ScrollView } from '~/src/components/Themed';
import CenterUI from '~/src/components/UI/Center';
import Loading from '~/src/components/UI/Loading';
import { actLoadWordsGroup, actToggleFlashWord } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
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

  const handleFlashWord = (word: WordType) => dispatch(actToggleFlashWord(word));
  const handleDetailsWord = (word: WordType) =>
    navigation.navigate('TabPracticeWordDetails', { word });

  const renderWords = () => {
    let result: React.ReactNode = null;
    result = words.map((word) => (
      <CommonWordItem
        word={word}
        key={word.id_word}
        handleFlashWord={() => handleFlashWord(word)}
        handleDetailsWord={() => handleDetailsWord(word)}
      />
    ));
    return result;
  };

  if (isPending) return <Loading />;

  const text = 'Bài học này đang cập nhật. Vui lòng quay lại sau.';
  if (words.length <= 0 && !isPending) return <CenterUI>{text}</CenterUI>;

  return (
    <ScrollView style={{ ...tailwind('flex-1'), backgroundColor: '#f3f3f3' }}>
      <View style={tailwind('my-2')}>{renderWords()}</View>
    </ScrollView>
  );
});

export default TabPracticeWords;
