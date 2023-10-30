import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { TodoList } from 'components/TodoList';
import {
  theme,
  cssWrap,
  primary,
  themePrimary,
  themeActiveWhite,themeBgBlack,
} from 'styles';
import { Todo } from 'types';


export default function App() {
  const [input, onChangeInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const onSubmitEditing = () => {
    const newTodo = {
      id: String(todos.length - 1),
      content: input,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    onChangeInput('');
  };

    const onCheckTodo = (id: string) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
      setTodos(newTodos);
    };

  return (
    <ThemeProvider theme={theme}>
      <Container>
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
        <TodoList todos={todos} onCheckTodo={onCheckTodo} />
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
