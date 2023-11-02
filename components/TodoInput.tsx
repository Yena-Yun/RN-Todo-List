import { forwardRef } from 'react';
import styled from 'styled-components/native';
import * as S from 'styles';

interface TodoInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  placeholder: string;
  placeholderTextColor?: string;
}

export const TodoInput = forwardRef((props: TodoInputProps, ref) => {
  const {
    value,
    onChangeText,
    onSubmitEditing,
    placeholder,
    placeholderTextColor,
  } = props;

  return (
    <TodoTextInput
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor || S.primary}
    />
  );
});

const TodoTextInput = styled.TextInput`
  ${S.cssTodoContainer};
`;
