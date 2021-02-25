import { AdMobBanner as DefaultAdMobBanner } from 'expo-ads-admob';
import React, { memo, useState } from 'react';
import tailwind from '~/tailwind';
import Config from '../constants/Config';
import { View } from './Themed';

// const ad_banner = 'ca-app-pub-3940256099942544/6300978111'; // key test
const { ad_banner } = Config.ads;

type AdsProps = {
  light?: boolean;
};

export type AdMobBannerProps = AdsProps & DefaultAdMobBanner['props'];

export default memo(function AdMobBanner(props: AdMobBannerProps) {
  const [bannerLoad, setBannerLoad] = useState(true);

  const bannerError = () => setBannerLoad(false);
  if (!bannerLoad) return <View />;

  return (
    <View light={props.light} style={tailwind('justify-center items-center')}>
      <DefaultAdMobBanner
        adUnitID={ad_banner}
        onDidFailToReceiveAdWithError={bannerError}
        servePersonalizedAds
        {...props}
      />
    </View>
  );
});
