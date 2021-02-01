import React from 'react';
import tailwind from 'tailwind-rn';
import { Text, View } from '../Themed';

type Props = { children: React.ReactNode };

export default function CenterUI(props: Props): JSX.Element {
  const { children } = props;

  return (
    <View style={tailwind('flex-1 justify-center items-center')}>
      <Text style={{ fontSize: 13 }}>{children}</Text>
    </View>
  );
}
