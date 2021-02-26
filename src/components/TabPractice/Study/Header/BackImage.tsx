import { FontAwesome5 } from '@expo/vector-icons';
import React, { memo } from 'react';
import { View } from '~/src/components/Themed';
import tailwind from '~/tailwind';

export default memo(function TabPracticeStudyHeaderBackImage() {
  return (
    <View style={tailwind('p-3 bg-transparent')}>
      <FontAwesome5 name="times" size={20} color="black" />
    </View>
  );
});
