import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { getWordsByIdGroup } from '~/src/models/WordsModel';
import tailwind from '~/tailwind';
import { TabPracticeParamList, WordType } from '~/types';
import AdMobBanner from '../../Ads';
import { Ripple, ScrollView, View } from '../../Themed';
import ScreenLoading from '../../UI/ScreenLoading';
import StudyWord from '../Study/StudyMode/StudyWord';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabPracticeWordDetails = React.memo((props: Props) => {
  const { word } = props.route.params;
  const [isPending, setIsPending] = useState(true);
  const [words, setWords] = useState<WordType[]>([]);

  useEffect(() => {
    (async () => {
      const getWords = await getWordsByIdGroup(word);
      if (getWords.data !== null) setWords(getWords.data);
      setIsPending(false);
    })();
  }, []);

  if (isPending) return <ScreenLoading />;

  return (
    <View style={tailwind('flex-1')}>
      <ScrollView
        light
        horizontal
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').width}
      >
        {words.map((item, i) => (
          <StudyWord key={i} word={item} />
        ))}
      </ScrollView>
      <View style={tailwind('w-full absolute bottom-0')}>
        <View style={tailwind('flex-row justify-between px-3 py-1')}>
          <Ripple style={styles.icon}>
            <Ionicons name="ios-arrow-back" size={22} color="black" />
          </Ripple>
          <Ripple style={styles.icon}>
            <Entypo name="flash" size={22} color="black" />
          </Ripple>
          <Ripple style={styles.icon}>
            <Entypo name="controller-play" size={22} color="black" />
          </Ripple>
          <Ripple style={styles.icon}>
            <MaterialIcons name="replay" size={22} color="black" />
          </Ripple>
          <Ripple style={styles.icon}>
            <Ionicons name="ios-arrow-forward" size={22} color="black" />
          </Ripple>
        </View>
        <AdMobBanner light bannerSize="smartBannerLandscape" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  icon: { ...tailwind('w-10 h-10 justify-center items-center') },
});

export default TabPracticeWordDetails;
