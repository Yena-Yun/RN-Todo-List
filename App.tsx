import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { TodoHeader } from 'components/TodoHeader';
import { TodoList } from 'components/TodoList';
import { theme, themeBgBlack } from 'styles/theme';
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
        <TodoHeader
          input={input}
          onChangeInput={onChangeInput}
          onSubmitEditing={onSubmitEditing}
        />
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
