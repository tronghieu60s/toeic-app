import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ripple, View } from '~/src/components/Themed';
import { flashIcon } from '~/src/constants/IconSource';
import { actToggleFlashWord } from '~/src/redux/actions/practiceAction';
import tailwind from '~/tailwind';
import { TabPracticeParamList, WordType } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

export default memo(function TabPracticeWordDetailsHeaderRight(props: Props) {
  const { route } = props;
  const { word } = route.params;
  const { difficult_study = 0 } = word;
  const iconFlash = flashIcon[difficult_study > 0 ? 1 : 0];

  const dispatch = useDispatch();
  const handleFlashWord = (word: WordType) => dispatch(actToggleFlashWord(word));

  return (
    <View style={tailwind('flex-row justify-end items-center mx-3 mt-3')}>
      <Ripple onPress={() => handleFlashWord(word)}>
        <Image style={{ width: 18, height: 18 }} source={iconFlash} />
      </Ripple>
    </View>
  );
});
