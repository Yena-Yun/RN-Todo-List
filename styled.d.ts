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
  }
}
