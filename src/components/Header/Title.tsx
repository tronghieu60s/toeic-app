import React from 'react';
import tailwind from '~/tailwind';
import { Text } from '../Themed';

type Props = { title: string };

const HeaderTitle = React.memo((props: Props) => {
  const { title } = props;
  return (
    <Text weight={700} style={tailwind('text-lg tracking-wider capitalize')}>
      {title}
    </Text>
  );
});

export default HeaderTitle;
