import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from '~/src/components/Themed';
import tailwind from '~/tailwind';

const TabPracticeStudyHeaderBackImage = React.memo(() => (
  <View style={tailwind('p-3 bg-transparent')}>
    <FontAwesome5 name="times" size={20} color="black" />
  </View>
));

export default TabPracticeStudyHeaderBackImage;
