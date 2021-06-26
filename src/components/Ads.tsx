import {
  AdMobBanner as DefaultAdMobBanner,
} from 'expo-ads-admob';
import React, { useState } from 'react';
import tailwind from '~/tailwind';
import Config from '../constants/Config';
import { View } from './Themed';

// key test
// const ad_banner = 'ca-app-pub-3940256099942544/6300978111';
// const ad_interstitial_video = 'ca-app-pub-3940256099942544/8691691433';

type AdsProps = {
  light?: boolean;
};

export type AdMobBannerProps = AdsProps & DefaultAdMobBanner['props'];

export function AdMobBanner(props: AdMobBannerProps): JSX.Element {
  const { light } = props;
  const [bannerLoad, setBannerLoad] = useState(true);

  const bannerError = () => setBannerLoad(false);
  if (!bannerLoad) return <View />;

  return (
    <View light={light} style={tailwind('justify-center items-center')}>
      {/* <DefaultAdMobBanner
        adUnitID={ad_banner}
        onDidFailToReceiveAdWithError={bannerError}
        servePersonalizedAds
        {...props}
      /> */}
    </View>
  );
}

export async function AdMobInterstitial(): Promise<void> {
  // await DefaultAdMobInterstitial.setAdUnitID(ad_interstitial_video);
  // await DefaultAdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  // await DefaultAdMobInterstitial.showAdAsync();
}

export async function AdMobRewarded(): Promise<void> {
  // await DefaultAdMobRewarded.setAdUnitID(ad_rewarded_video);
  // await DefaultAdMobRewarded.requestAdAsync();
  // await DefaultAdMobRewarded.showAdAsync();
}
