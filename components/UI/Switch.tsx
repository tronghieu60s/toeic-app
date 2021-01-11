import React, { memo } from 'react';
import { StyleSheet, Switch } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { Text, View } from '../Themed';

type Props = {
  name: string;
  description: string;
  value: boolean;
  onValueChange: () => void;
};

const SwitchCustom = memo((props: Props) => {
  const { name, description, value, onValueChange } = props;

  return (
    <View style={styles.modalItem}>
      <Ripple style={styles.modalLeft} onPress={onValueChange}>
        <Text weight={700} style={styles.modalItemName}>
          {name}
        </Text>
        <Text style={styles.modalItemDesc}>{description}</Text>
      </Ripple>
      <View style={styles.modalRight}>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#767577', true: '#5e72e480' }}
          thumbColor={value ? '#5e72e4' : '#fff'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalLeft: {
    flex: 8,
    paddingVertical: 10,
  },
  modalRight: {
    flex: 1,
  },
  modalItemName: {
    fontSize: 13,
  },
  modalItemDesc: {
    color: '#888',
    fontSize: 13,
  },
});

export default SwitchCustom;
