export const theme = {
  colors: {
    primary: '#8694dd',
    activeWhite: '#cecece',
    inactiveGray: '#616161',
    todoGray: '#313131',
    bgBlack: '#101010',
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
