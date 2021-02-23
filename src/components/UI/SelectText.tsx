import React from 'react';
import tailwind from '~/tailwind';
import { Ripple, Text } from '../Themed';

type Props = {
  name: string;
  description: string;
  onValueChange?: () => void;
};

const SelectText = (props: Props) => {
  const { name, description, onValueChange } = props;
  return (
    <Ripple style={tailwind('flex-auto py-2')} onPress={onValueChange}>
      <Text weight={700} style={{ fontSize: 13 }}>
        {name}
      </Text>
      <Text style={{ color: '#888', fontSize: 13 }}>{description}</Text>
    </Ripple>
  );
};

SelectText.defaultProps = {
  onValueChange: null,
};

export default SelectText;
