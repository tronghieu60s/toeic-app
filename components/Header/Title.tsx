import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

const HeaderTitle = memo(({ title }: { title: string }) => (
  <View>
    <Text weight={700} style={styles.title}>
      {title}
    </Text>
  </View>
));

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    letterSpacing: 0.5,
  },
});

export default HeaderTitle;
