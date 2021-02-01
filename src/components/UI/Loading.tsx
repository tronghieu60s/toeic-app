import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import CenterUI from './Center';

const Loading = memo(() => (
  <CenterUI>
    <ActivityIndicator size="small" color="#0000ff" />
  </CenterUI>
));

export default Loading;
