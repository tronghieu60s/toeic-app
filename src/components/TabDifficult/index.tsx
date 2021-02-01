import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { actLoadWordsDifficult, actToggleFlashWord } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import { TabDifficultParamList, WordType } from '~/types';
import CommonWordItem from '../Common/WordItem';
import { ScrollView, View } from '../Themed';
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

  const text = 'Không có từ khó. Bạn đang làm rất tốt ^^.';
  if (words.length <= 0 && !isPending) return <CenterUI>{text}</CenterUI>;

  return (
    <ScrollView style={tailwind('flex-1')}>
      <View style={{ ...tailwind('flex-1 pb-14'), backgroundColor: '#f3f3f3' }}>
        <View style={{ ...tailwind('py-1'), backgroundColor: '#f3f3f3' }}>{renderWords()}</View>
      </View>
    </ScrollView>
  );
});

export default TabDifficult;
