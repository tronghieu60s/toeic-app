import { AdMobBanner as DefaultAdMobBanner } from 'expo-ads-admob';
import React, { useEffect, useState } from 'react';
import tailwind from '~/tailwind';
import Config from '../constants/Config';
import apiCaller from '../utils/ApiCaller';
import { View } from './Themed';

const ad_banner = 'ca-app-pub-3940256099942544/6300978111';
// const { ad_banner } = Config.ads;

type ThemeProps = {
  light?: boolean;
};

export type Props = ThemeProps & DefaultAdMobBanner['props'];

const AdMobBanner = React.memo((props: Props) => {
  const [noAds, setNoAds] = useState(false);
  const [bannerLoad, setBannerLoad] = useState(true);

  useEffect(() => {
    (async () => {
      const config = await apiCaller('config.json');
      // if (config) setNoAds(config.no_ads);
      // else setNoAds(true);
    })();
  }, []);

  const bannerError = () => setBannerLoad(false);
  if (!bannerLoad || noAds) return <View />;

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

export default AdMobBanner;
