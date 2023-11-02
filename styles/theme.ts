export const theme = {
  colors: {
    primary: '#778bdd',
    activeWhite: '#eeeeee',
    inactiveGray: '#666666',
    todoGray: '#333333',
    bgBlack: '#111111',
  },
  sizes: {
    size4: '4px',
    size8: '8px',
    size12: '12px',
    size16: '16px',
    size20: '20px',
    size32: '32px',
    size60: '60px',
  },
  weights: {
    weight500: 500,
  },
};

export const primary = theme.colors.primary;
export const activeWhite = theme.colors.activeWhite;
export const inactiveGray = theme.colors.inactiveGray;
export const todoGray = theme.colors.todoGray;
export const bgBlack = theme.colors.bgBlack;

interface Theme {
  theme: any;
}

export const themePrimary = ({ theme }: Theme) => theme.colors.primary;
export const themeActiveWhite = ({ theme }: Theme) => theme.colors.activeWhite;
export const themeInactiveGray = ({ theme }: Theme) =>
  theme.colors.inactiveGray;
export const themeTodoGray = ({ theme }: Theme) => theme.colors.todoGray;
export const themeBgBlack = ({ theme }: Theme) => theme.colors.bgBlack;

export const themeSize4 = ({ theme }: Theme) => theme.sizes.size4;
export const themeSize8 = ({ theme }: Theme) => theme.sizes.size8;
export const themeSize12 = ({ theme }: Theme) => theme.sizes.size12;
export const themeSize16 = ({ theme }: Theme) => theme.sizes.size16;
export const themeSize20 = ({ theme }: Theme) => theme.sizes.size20;
export const themeSize32 = ({ theme }: Theme) => theme.sizes.size32;
export const themeSize60 = ({ theme }: Theme) => theme.sizes.size60;

export const themeWeight500 = ({ theme }: Theme) => theme.weights.weight500;
