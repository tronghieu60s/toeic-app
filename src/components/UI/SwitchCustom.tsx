import React, { memo } from 'react';
import { Switch } from 'react-native';
import tailwind from '~/tailwind';
import { View } from '../Themed';
import SelectText from './SelectText';

type Props = {
  name: string;
  description: string;
  value: boolean;
  onValueChange: () => void;
};

export default memo(function SwitchCustom(props: Props) {
  const { name, description, value, onValueChange } = props;

  return (
    <View style={tailwind('flex-row justify-between items-center')}>
      <SelectText name={name} description={description} onValueChange={onValueChange} />
      <View style={tailwind('flex-auto')}>
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
