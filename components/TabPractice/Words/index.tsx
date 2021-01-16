import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { delay } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from '~/components/Themed';
import CenterUI from '~/components/UI/Center';
import Loading from '~/components/UI/Loading';
import { actLoadWordsGroup } from '~/redux/actions/practiceAction';
import { RootState } from '~/redux/reducers/rootReducer';
import { TabPracticeParamList } from '~/types';
import TabPracticeWordItem from './Word';

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
    delay(async () => {
      // Await Dispatch
      await dispatch(actLoadWordsGroup(group));
      setIsPending(false);
    }, 500);
  }, []);

  const renderWords = () => {
    let result: React.ReactNode = null;
    result = words.map((word) => (
      <TabPracticeWordItem key={word.id_word} word={word} navigation={navigation} />
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
  fixed: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    zIndex: 100,
  },
  play: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5e72e4',
    borderRadius: 50 / 2,
  },
  icon: {
    backgroundColor: 'transparent',
    marginLeft: 3,
    marginTop: 1,
  },
});

export default TabPracticeWords;
