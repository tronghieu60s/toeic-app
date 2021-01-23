import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../Themed';

const HeaderTitle = memo(({ title }: { title: string }) => (
  <Text weight={700} style={styles.title}>
    {title}
  </Text>
));

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
});

export default HeaderTitle;
