import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { SpeechEnglish } from '~/src/helpers/sound';
import { actToggleFlashWord } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabPracticeParamList } from '~/types';
import { AdMobBanner } from '../../Ads';
import { Ripple, View } from '../../Themed';
import ScreenLoading from '../../UI/ScreenLoading';
import StudyWord from '../Study/StudyMode/StudyWord';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

export default memo(function TabPracticeWordDetails(props: Props) {
  const { word } = props.route.params;
  const { width } = Dimensions.get('window');
  const scroll = useRef<ScrollView>(null);

  const [isPending, setIsPending] = useState(true);
  const [playSound, setPlaySound] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [curNum, setCurNum] = useState(0);

  const dispatch = useDispatch();
  const common = useSelector((state: RootState) => state.common);
  const { voiceIdentify: voice, voiceRate: rate, voicePitch: pitch } = common;
  const words = useSelector((state: RootState) => state.practice.words);

  useEffect(() => {
    const playInterval = setInterval(() => {
      if (autoPlay) setNewCurNum(curNum >= words.length - 1 ? 0 : curNum + 1);
    }, 2000);

    return () => clearInterval(playInterval);
  });

  useEffect(() => {
    const index = words.findIndex((o) => o.id_word === word.id_word);
    setNewCurNum(index);
    setIsPending(false);
    (async () => {
      const play_sound = await AsyncStorage.getItem('@play_sound');
      setPlaySound(play_sound === 'true');
    })();
  }, []);

  useEffect(() => {
    scroll?.current?.scrollTo({
      x: width * curNum,
      animated: true,
    });
  }, [curNum]);

  const setNewCurNum = (curNum: number) => {
    setCurNum(curNum);
    if (playSound) SpeechEnglish(words[curNum].name_word || '', { voice, rate, pitch });
  };
  const onPressSetPlaySound = async () => {
    const newPlaySound = !playSound;
    await AsyncStorage.setItem('@play_sound', `${newPlaySound}`);
    setPlaySound(newPlaySound);
  };
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentPosition = e.nativeEvent.contentOffset.x;
    const newCurNum = Math.ceil(currentPosition / width);
    setNewCurNum(newCurNum);
  };

  const onPressToggleAutoPlay = () => setAutoPlay(!autoPlay);
  const onPressPreviousWord = () => setNewCurNum(curNum <= 0 ? words.length - 1 : curNum - 1);
  const onPressNextWord = () => setNewCurNum(curNum >= words.length - 1 ? 0 : curNum + 1);
  const onPressToggleDifficult = () => dispatch(actToggleFlashWord(words[curNum]));

  const flashColor = (words[curNum].difficult_study || 0) > 0 ? '#5e72e4' : 'black';

  if (isPending) return <ScreenLoading />;
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
            <MaterialCommunityIcons name="flash" size={22} color={flashColor} />
          </Ripple>
          <Ripple style={styles.icon} onPress={onPressToggleAutoPlay}>
            <Ionicons name={autoPlay ? 'md-pause' : 'md-play'} size={20} color="black" />
          </Ripple>
          <Ripple style={styles.icon} onPress={onPressSetPlaySound}>
            <MaterialIcons name={`volume-${playSound ? 'up' : 'off'}`} size={22} color="black" />
          </Ripple>
          <Ripple style={styles.icon} onPress={onPressNextWord}>
            <Ionicons name="ios-arrow-forward" size={22} color="black" />
          </Ripple>
        </View>
        <AdMobBanner light bannerSize="banner" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  icon: { ...tailwind('w-10 h-10 justify-center items-center') },
});
