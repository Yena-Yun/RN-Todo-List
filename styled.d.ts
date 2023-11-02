import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      activeWhite: string;
      inactiveGray: string;
      todoGray: string;
      bgBlack: string;
    };
    sizes: {
      size4: string;
      size8: string;
      size12: string;
      size16: string;
      size20: string;
      size32: string;
      size60: string;
    };
    weights: {
      weight500: number;
    };
  }
}
