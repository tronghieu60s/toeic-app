import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonWordItem from '~/components/Common/Word';
import { ScrollView } from '~/components/Themed';
import CenterUI from '~/components/UI/Center';
import Loading from '~/components/UI/Loading';
import { actLoadWordsGroup, actToggleFlashWord } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import { TabPracticeParamList, WordType } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWords = memo(({ route, navigation }: Props) => {
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
  const handleDetailsWord = (word: WordType) =>
    // eslint-disable-next-line implicit-arrow-linebreak
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.group}>{renderWords()}</View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  group: {
    marginVertical: 5,
    backgroundColor: '#f3f3f3',
  },
});

export default TabPracticeWords;
