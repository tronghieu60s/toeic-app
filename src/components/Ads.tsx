import {
  AdMobBanner as DefaultAdMobBanner,
  AdMobInterstitial as DefaultAdMobInterstitial,
} from 'expo-ads-admob';
import React, { useState } from 'react';
import tailwind from '~/tailwind';
import { View } from './Themed';

const ad_banner = 'ca-app-pub-3940256099942544/6300978111'; // key test
// const { ad_banner } = Config.ads;

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
      <DefaultAdMobBanner
        adUnitID={ad_banner}
        onDidFailToReceiveAdWithError={bannerError}
        servePersonalizedAds
        {...props}
      />
    </View>
  );
}

export async function AdMobInterstitial(): Promise<void> {
  await DefaultAdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433');
  await DefaultAdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  await DefaultAdMobInterstitial.showAdAsync();
}
