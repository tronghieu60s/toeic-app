import React, { memo } from 'react';
import tailwind from 'tailwind-rn';
import { Text } from '../Themed';

type Props = {
  title: string;
};

const HeaderTitle = memo((props: Props) => {
  const { title } = props;
  return (
    <Text weight={700} style={tailwind('text-lg tracking-wider capitalize')}>
      {title}
    </Text>
  );
});

export default HeaderTitle;
