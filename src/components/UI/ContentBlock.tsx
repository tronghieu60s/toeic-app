import React, { memo } from 'react';
import tailwind from '~/tailwind';
import { Text, View } from '../Themed';

type Props = {
  title: string;
  children: JSX.Element;
};

export default memo(function ContentBlock(props: Props) {
  const { title, children } = props;
  return (
    <View style={tailwind('p-3 rounded-lg mb-2')}>
      <Text weight={700} style={{ ...tailwind('mb-4'), fontSize: 13, color: '#5e72e4' }}>
        {title}
      </Text>
      {children}
    </View>
  );
});
