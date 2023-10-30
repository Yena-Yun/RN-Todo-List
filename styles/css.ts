import { css } from 'styled-components/native';

export const cssWrap = css`
  width: 100%;
  height: 48px;
  margin-bottom: 4px;
  padding: 12px 16px;
  font-size: 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.todoGray};
`;

export const cssFlex1 = css`
  flex: 1;
`;

export const cssFlexRow = css`
  flex-direction: row;
`;

export const cssJustifyCenter = css`
  justify-content: center;
`;

export const cssJustifyBetween = css`
  justify-content: space-between;
`;

export const cssWidthFull = css`
  width: 100%;
`;
