import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DefaultRipple from 'react-native-material-ripple';
import tailwind from '~/tailwind';
import { Text } from '../Themed';

type Props = {
  title: string;
};

type ViewProps = Props & DefaultRipple['props'];

export default memo(function ButtonDefault(props: ViewProps) {
  const { title, onPress } = props;
  return (
    <DefaultRipple
      rippleContainerBorderRadius={50}
      style={styles.button}
      onPress={onPress}
      {...props}
    >
      <Text style={tailwind('text-white text-sm tracking-wide')}>{title}</Text>
    </DefaultRipple>
  );
});

const styles = StyleSheet.create({
  button: {
    ...tailwind('w-full items-center mt-4 rounded-xl'),
    backgroundColor: '#5e72e4',
    paddingVertical: 10,
  },
});
