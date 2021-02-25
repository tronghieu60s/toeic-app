import React, { memo } from 'react';
import tailwind from '~/tailwind';
import { Text } from '../Themed';

type Props = { title: string };

export default memo(function HeaderTitle(props: Props) {
  const { title } = props;
  return (
    <Text weight={700} style={tailwind('text-lg tracking-wider capitalize')}>
      {title}
    </Text>
  );
});
