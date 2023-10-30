import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import styled, { ThemeProvider, css } from 'styled-components/native';

const theme = {
  colors: {
    primary: '#818fc0',
    activeWhite: '#cecece',
    inactiveGray: '#616161',
    todoGray: '#313131',
    bgBlack: '#101010',
  },
};

export default function App() {
  const [text, onChangeText] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  const onSubmitEditing = () => {
    setTodos([...todos, text]);
    onChangeText('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>TODO List</Title>
        <StyledInputView>
          <StyledInput
            value={text}
            onChangeText={onChangeText}
            placeholder='+ Add a Task'
            placeholderTextColor={theme.colors.primary}
            onSubmitEditing={onSubmitEditing}
          />
        </StyledInputView>
        <TodoList>
          {todos.map((todo) => (
            <Todo>{todo}</Todo>
          ))}
        </TodoList>
        <StatusBar style='auto' />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  width: 100%;
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.bgBlack};
  justify-content: center;
`;

const Title = styled.Text`
  padding-left: 4px;
  margin-bottom: 12px;
  font-size: 32px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledInputView = styled.View`
  width: 100%;
`;

const cssWrap = css`
  height: 48px;
  font-size: 20px;
  padding: 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.activeWhite};
  background-color: ${({ theme }) => theme.colors.todoGray};
`;

const StyledInput = styled.TextInput`
  ${cssWrap}
  margin-bottom: 12px;
`;

const TodoList = styled.View`
  width: 100%;
`;

const Todo = styled.Text`
  ${cssWrap}
`;
