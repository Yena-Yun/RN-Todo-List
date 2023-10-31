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
  cssFlex1,
  cssJustifyCenter,
  cssWidthFull,
  themeSize12,
  themeSize20,
  themeSize32,
  themeSize4,
  themeWeight500,
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
    setTodos((todos) => [...todos, newTodo]);
    onChangeInput('');
  };

  const onCheckTodo = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(newTodos); 
  };

  const onDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
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
        <TodoList
          todos={todos}
          onCheckTodo={onCheckTodo}
          onDeleteTodo={onDeleteTodo}
        />
        <StatusBar style='auto' />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  ${cssFlex1}
  ${cssJustifyCenter}
  ${cssWidthFull}
  padding: ${themeSize20};
  background-color: ${themeBgBlack};
`;

const Title = styled.Text`
  margin-bottom: ${themeSize12};
  padding-left: ${themeSize4};
  font-size: ${themeSize32};
  font-weight: ${themeWeight500};
  color: ${themePrimary};
`;

const TodoInputView = styled.View`
  ${cssWidthFull}
`;

const TodoInput = styled.TextInput.attrs({
  placeholder: '+ Add a Task',
  placeholderTextColor: primary,
})`
  ${cssWrap}
  margin-bottom: ${themeSize12};
  color: ${themeActiveWhite};
`;
