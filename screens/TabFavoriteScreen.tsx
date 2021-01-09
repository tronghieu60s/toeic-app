import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, View } from '../components/Themed';
import { setTheme, toggleTheme } from '../redux/actions/commonAction';

export default function TabFavoriteScreen(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Button title="Dark Mode" onPress={() => dispatch(setTheme('dark'))} />
      <Button title="Dark Mode Toggle" onPress={() => dispatch(toggleTheme())} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
