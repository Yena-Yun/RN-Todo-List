import styled from 'styled-components/native';
import { cssWrap, primary, themePrimary, themeActiveWhite } from 'styles';

interface TodoHeaderProps {
  input: string;
  onChangeInput: (input: string) => void;
  onSubmitEditing: () => void;
}

export const TodoHeader = ({
  input,
  onChangeInput,
  onSubmitEditing,
}: TodoHeaderProps) => {
  return (
    <>
      <Title>TODO List</Title>
      <StyledInputView>
        <StyledInput
          value={input}
          onChangeText={onChangeInput}
          placeholder='+ Add a Task'
          placeholderTextColor={primary}
          onSubmitEditing={onSubmitEditing}
        />
      </StyledInputView>
    </>
  );
};

const Title = styled.Text`
  padding-left: 4px;
  margin-bottom: 12px;
  font-size: 32px;
  font-weight: 500;
  color: ${themePrimary};
`;

const StyledInputView = styled.View`
  width: 100%;
`;

const StyledInput = styled.TextInput`
  ${cssWrap}
  margin-bottom: 12px;
  color: ${themeActiveWhite};
`;
