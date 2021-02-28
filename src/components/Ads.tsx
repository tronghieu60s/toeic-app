import {
  AdMobBanner as DefaultAdMobBanner,
  AdMobInterstitial as DefaultAdMobInterstitial,
  AdMobRewarded as DefaultAdMobRewarded,
} from 'expo-ads-admob';
import React, { useEffect, useState } from 'react';
import tailwind from '~/tailwind';
import Config from '../constants/Config';
import apiCaller from '../utils/ApiCaller';
import { View } from './Themed';

// key test
// const ad_banner = 'ca-app-pub-3940256099942544/6300978111';
// const ad_interstitial_video = 'ca-app-pub-3940256099942544/8691691433';
const { api_ads } = Config.ads;
const ad_rewarded_video = 'ca-app-pub-3940256099942544/5354046379';
const { ad_banner, ad_interstitial_video } = Config.ads;

type AdsProps = {
  light?: boolean;
};

export type AdMobBannerProps = AdsProps & DefaultAdMobBanner['props'];

export function AdMobBanner(props: AdMobBannerProps): JSX.Element {
  const { light } = props;
  const [isPending, setIsPending] = useState(true);
  const [adsStatus, setAdsStatus] = useState(true);
  const [bannerLoad, setBannerLoad] = useState(true);

  useEffect(() => {
    (async () => {
      const api = await apiCaller(api_ads);
      setAdsStatus(api.ads);
      setIsPending(false);
    })();
  }, []);

  const bannerError = () => setBannerLoad(false);
  if (!bannerLoad || !adsStatus || isPending) return <View />;

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
  const api = await apiCaller(api_ads);
  const adsStatus = api.ads;

  if (adsStatus) {
    await DefaultAdMobInterstitial.setAdUnitID(ad_interstitial_video);
    await DefaultAdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await DefaultAdMobInterstitial.showAdAsync();
  }
}

export async function AdMobRewarded(): Promise<void> {
  await DefaultAdMobRewarded.setAdUnitID(ad_rewarded_video);
  await DefaultAdMobRewarded.requestAdAsync();
  await DefaultAdMobRewarded.showAdAsync();
}
