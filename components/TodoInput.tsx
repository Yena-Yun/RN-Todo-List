import { forwardRef } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import * as S from 'styles';

interface TodoInputProps {
  width?: number;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  placeholder: string;
}

export const TodoInput = forwardRef((props: TodoInputProps, ref) => {
  const { value, onChangeText, onSubmitEditing, placeholder } = props;

  const width = Dimensions.get('window').width;

  return (
    <TodoTextInput
      ref={ref}
      width={width}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      maxLength={50}
      autoCapitalize='none' // 자동 대문자 끄기
      autoCorrect={false} // 자동 오타 수정 끄기
      returnKeyType='done' // iOS 엔터키를 'return'이 아닌 'done'으로 변경
      keyboardAppearance='dark' // iOS에서 키보드 색상이 어둡게 나타나도록 변경
    />
  );
});

const TodoTextInput = styled.TextInput.attrs({
  placeholderTextColor: S.primary,
})<{ width: number }>`
  ${S.cssTodoContainer};
  width: ${({ width }) => width - 40}px;
`;
