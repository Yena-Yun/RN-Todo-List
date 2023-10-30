import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { TodoList } from 'components/TodoList';
import { Todo } from 'types';
import {
  theme,
  cssWrap,
  primary,
  themePrimary,
  themeActiveWhite,
  themeBgBlack,
} from 'styles';

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
        <TodoInputView>
          <TodoInput
            value={input}
            onChangeText={onChangeInput}
            onSubmitEditing={onSubmitEditing}
          />
        </TodoInputView>
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

const TodoInputView = styled.View`
  width: 100%;
`;

const TodoInput = styled.TextInput.attrs({
  placeholder: '+ Add a Task',
  placeholderTextColor: primary,
})`
  ${cssWrap}
  margin-bottom: 12px;
  color: ${themeActiveWhite};
`;
