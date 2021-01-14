import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from '~/components/Themed';
import CenterUI from '~/components/UI/Center';
import { delayLoading } from '~/helpers/common';
import { loadWordsGroup } from '~/redux/actions/practiceAction';
import { RootState } from '~/redux/reducers/rootReducer';
import { TabPracticeParamList } from '~/types';
import TabPracticeWordItem from './Word';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWords = memo(({ route, navigation }: Props) => {
  const { key = '1' } = route.params.group;
  const [loadWords, setLoadWords] = useState(true);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.practiceWords);

  useEffect(() => {
    (async () => {
      setLoadWords(true);

      dispatch(loadWordsGroup(key));
      await delayLoading();

      setLoadWords(false);
    })();
  }, []);

  const renderWords = () => {
    let result: React.ReactNode = null;
    result = words.map((word) => (
      <TabPracticeWordItem key={word.name} word={word} navigation={navigation} />
    ));
    return result;
  };

  if (loadWords) {
    return (
      <CenterUI>
        <ActivityIndicator size="small" color="#0000ff" />
      </CenterUI>
    );
  }

  if (words.length <= 0 && !loadWords) {
    return <CenterUI>Bài học này đang cập nhật. Vui lòng quay lại sau.</CenterUI>;
  }

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
