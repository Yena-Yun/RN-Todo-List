import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { TodoList } from 'components/TodoList';
import { TodoHeader } from 'components/TodoHeader';
import { themeBgBlack } from 'styles';
import { theme } from 'styles/theme';

type Todo = string[];

export default function App() {
  const [input, onChangeInput] = useState('');
  const [todos, setTodos] = useState<Todo>([]);

  const onSubmitEditing = () => {
    setTodos((todos) => [...todos, input]);
    onChangeInput('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TodoHeader
          input={input}
          onChangeInput={onChangeInput}
          onSubmitEditing={onSubmitEditing}
        />
        <TodoList todos={todos} />
        <StatusBar style='auto' />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  width: 100%;
  flex: 1;
  padding: 20px;
  background-color: ${themeBgBlack};
  justify-content: center;
`;
