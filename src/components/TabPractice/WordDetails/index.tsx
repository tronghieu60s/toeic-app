import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { actToggleFlashWord } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabPracticeParamList } from '~/types';
import AdMobBanner from '../../Ads';
import { Ripple, View } from '../../Themed';
import StudyWord from '../Study/StudyMode/StudyWord';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

export default memo(function TabPracticeWordDetails(props: Props) {
  const { word } = props.route.params;
  const { width } = Dimensions.get('window');
  const scroll = useRef<ScrollView>(null);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.words);
  const [autoPlay, setAutoPlay] = useState(false);
  const [curNum, setCurNum] = useState(0);

  useEffect(() => {
    const playInterval = setInterval(() => {
      if (autoPlay) {
        const nextNum = curNum >= words.length - 1 ? 0 : curNum + 1;
        setCurNum(nextNum);
      }
    }, 2000);

    return () => clearInterval(playInterval);
  });

  useEffect(() => {
    const index = words.findIndex((o) => o.id_word === word.id_word);
    setCurNum(index);
  }, []);

  useEffect(() => {
    scroll?.current?.scrollTo({
      x: width * curNum,
      animated: true,
    });
  }, [curNum]);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentPosition = e.nativeEvent.contentOffset.x;
    setCurNum(Math.ceil(currentPosition / width));
  };

  const onPressToggleAutoPlay = () => setAutoPlay(!autoPlay);
  const onPressPreviousWord = () => setCurNum(curNum <= 0 ? words.length - 1 : curNum - 1);
  const onPressNextWord = () => setCurNum(curNum >= words.length - 1 ? 0 : curNum + 1);
  const onPressToggleDifficult = () => dispatch(actToggleFlashWord(words[curNum]));

  return (
    <View style={tailwind('flex-1')}>
      <ScrollView
        ref={scroll}
        style={{ backgroundColor: '#f3f3f3' }}
        horizontal
        decelerationRate="fast"
        snapToInterval={width}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {words.map((item, i) => (
          <StudyWord key={i} word={item} />
        ))}
      </ScrollView>
      <View style={tailwind('w-full absolute bottom-0')}>
        <View style={tailwind('flex-row justify-between px-3 py-1')}>
          <Ripple style={styles.icon} onPress={onPressPreviousWord}>
            <Ionicons name="ios-arrow-back" size={22} color="black" />
          </Ripple>
          <Ripple style={styles.icon} onPress={onPressToggleDifficult}>
            <Entypo
              name="flash"
              size={22}
              color={(words[curNum].difficult_study || 0) > 0 ? '#5e72e4' : 'black'}
            />
          </Ripple>
          <Ripple style={styles.icon} onPress={onPressToggleAutoPlay}>
            <Ionicons name={autoPlay ? 'md-pause' : 'md-play'} size={20} color="black" />
          </Ripple>
          <Ripple style={styles.icon}>
            <MaterialIcons name="replay" size={22} color="black" />
          </Ripple>
          <Ripple style={styles.icon} onPress={onPressNextWord}>
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
