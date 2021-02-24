import React from 'react';
import { ActivityIndicator } from 'react-native';
import CenterUI from './ScreenCenter';

const ScreenLoading = React.memo(() => (
  <CenterUI>
    <ActivityIndicator size="small" color="#0000ff" />
  </CenterUI>
));

export default ScreenLoading;
