import { css } from 'styled-components/native';

export const cssWrap = css`
  width: 100%;
  height: 48px;
  font-size: 20px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.todoGray};
`;
