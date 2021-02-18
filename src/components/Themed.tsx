import * as React from 'react';
import {
  ScrollView as DefaultScrollView,
  Text as DefaultText,
  View as DefaultView,
} from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DefaultRipple from 'react-native-material-ripple';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import { RootState } from '../redux/reducers/rootReducer';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
): string {
  const theme = useSelector((state: RootState) => state.common.theme);
  const colorFromProps = props[theme];

  if (colorFromProps) return colorFromProps;
  return Colors[theme][colorName];
}

type ThemeProps = {
  light?: boolean;
  weight?: 300 | 400 | 600 | 700 | 800;
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type RippleProps = ThemeProps & DefaultRipple['props'];

export function Text(props: TextProps): JSX.Element {
  const { style, weight, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <DefaultText style={[{ color, fontFamily: `san-${weight || 400}` }, style]} {...otherProps} />
  );
}

export function View(props: ViewProps): JSX.Element {
  const { style, light, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    light ? 'background2' : 'background',
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps): JSX.Element {
  const { style, light, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    light ? 'background2' : 'background',
  );

  return (
    <DefaultScrollView
      style={[{ backgroundColor }, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...otherProps}
    />
  );
}

export function Ripple(props: RippleProps): JSX.Element {
  const { style, light, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    light ? 'background2' : 'background',
  );

  return (
    <DefaultRipple
      rippleCentered
      rippleContainerBorderRadius={50}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
