import { AdMobBanner as DefaultAdMobBanner } from 'expo-ads-admob';
import React from 'react';
import tailwind from '~/tailwind';
import Config from '../constants/Config';
import { View } from './Themed';

const { ad_banner } = Config.ads;

export type Props = DefaultAdMobBanner['props'];

const AdMobBanner = React.memo((props: Props) => (
  <View light style={tailwind('p-2 justify-center items-center')}>
    <DefaultAdMobBanner adUnitID={ad_banner} servePersonalizedAds {...props} />
  </View>
));

export default AdMobBanner;
