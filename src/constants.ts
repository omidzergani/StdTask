import {Platform} from 'react-native';

interface fontStyle {
  fontFamily: string;
  fontWeight?: any;
}

export const FONTS = Platform.select<{
  thin: fontStyle;
  light: fontStyle;
  regular: fontStyle;
  medium: fontStyle;
  bold: fontStyle;
  black: fontStyle;
}>({
  ios: {
    black: {
      fontFamily: 'Vazir-Black-UI',
      fontWeight: '900',
    },
    bold: {
      fontFamily: 'Vazir-Bold-UI',
      fontWeight: '700',
    },
    medium: {
      fontFamily: 'Vazir-Medium-UI',
      fontWeight: '600',
    },
    regular: {
      fontFamily: 'Vazir-Regular-UI',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'Vazir-Light-UI',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Vazir-Thin-UI',
      fontWeight: '100',
    },
  },
  android: {
    black: {
      fontFamily: 'Vazir-Black-UI',
    },
    bold: {
      fontFamily: 'Vazir-Bold-UI',
    },
    medium: {
      fontFamily: 'Vazir-Medium-UI',
    },
    regular: {
      fontFamily: 'Vazir-Regular-UI',
    },
    light: {
      fontFamily: 'Vazir-Light-UI',
    },
    thin: {
      fontFamily: 'Vazir-Thin-UI',
    },
  },
});

export type WEIGHTS = keyof typeof FONTS;
