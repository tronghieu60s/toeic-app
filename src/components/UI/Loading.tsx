import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import CenterUI from './Center';

export default memo(function Loading() {
  return (
    <CenterUI>
      <ActivityIndicator size="small" color="#0000ff" />
    </CenterUI>
  );
});
