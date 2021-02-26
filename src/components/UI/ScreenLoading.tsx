import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import CenterUI from './ScreenCenter';

export default memo(function ScreenLoading() {
  return (
    <CenterUI>
      <ActivityIndicator size="small" color="#0000ff" />
    </CenterUI>
  );
});
