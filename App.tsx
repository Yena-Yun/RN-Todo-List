import { useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import uuid from 'react-native-uuid';
import { CheckIcon, EditIcon, DeleteIcon } from 'components/icons';
import { IsDone, Todo } from 'types';
import {
  theme,
  cssWrap,
  primary,
  activeWhite,
  inactiveGray,
  themePrimary,
  themeActiveWhite,
  themeBgBlack,
  cssFlex1,
  cssJustifyCenter,
  cssFlexRow,
  cssJustifyBetween,
  cssWidthFull,
  themeSize12,
  themeSize16,
  themeSize20,
  themeSize32,
  themeSize4,
  themeWeight500,
} from 'styles';
import { TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const editInputRef = useRef<TextInput | null>(null);
  const [initialInput, onChange] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editContent, onEditContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState('');

  const onCreateTodo = () => {
    const newTodo = {
      id: uuid.v4() as string,
      content: initialInput,
      isDone: false,
    };
    setTodos((todos) => [...todos, newTodo]);
    onChange('');
  };

  const onCheckTodo = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(newTodos);
  };

  const handleIsEdit = (id: string) => {
    setEditIndex(id);
    setIsEdit(true);
  };

  const onEditTodo = (id: string, editedTodo: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: editedTodo } : todo
    );
    setTodos(newTodos);
    onEditContent('');
    setIsEdit(false);
  };

  const onDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  useEffect(() => {
    if (editInputRef.current) editInputRef.current.focus();
  }, [isEdit]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>TODO List</Title>
        <TodoInputView>
          <TodoTextInput
            value={initialInput}
            onChangeText={onChange}
            onSubmitEditing={onCreateTodo}
          />
        </TodoInputView>
        <TodoList>
          {todos.map(({ id, content, isDone }) => (
            <TodoView key={id}>
              {isEdit && id === editIndex ? (
                <>
                  <EditTextInput
                    ref={editInputRef}
                    value={editContent}
                    onChangeText={onEditContent}
                    onSubmitEditing={() => onEditTodo(id, editContent)}
                  />
                </>
              ) : (
                <>
                  <TodoTouchable onPress={() => onCheckTodo(id)}>
                    <CheckIcon isDone={isDone} />
                    <TodoContent isDone={isDone}>{content}</TodoContent>
                  </TodoTouchable>
                  <ButtonGroupView>
                    {!isDone && (
                      <TouchableOpacity onPress={() => handleIsEdit(id)}>
                        <EditIcon />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => onDeleteTodo(id)}>
                      <DeleteIcon isDone={isDone} />
                    </TouchableOpacity>
                  </ButtonGroupView>
                </>
              )}
            </TodoView>
          ))}
        </TodoList>
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

const TodoTextInput = styled.TextInput.attrs({
  placeholder: '+ Add a Task',
  placeholderTextColor: primary,
})`
  ${cssWrap}
  margin-bottom: ${themeSize12};
  color: ${themeActiveWhite};
`;
const TodoList = styled.ScrollView`
  ${cssWidthFull}
`;

const EditTextInput = styled.TextInput`
  width: 90%;
  color: #ffffff;
`;

const TodoView = styled.View`
  ${cssWrap}
  ${cssFlexRow}
  ${cssJustifyBetween}
`;

const TodoTouchable = styled.TouchableOpacity`
  ${cssFlexRow}
  gap: ${themeSize12};
  width: 80%;
`;

const TodoContent = styled.Text<IsDone>`
  font-size: ${themeSize16};
  color: ${({ isDone }) => (isDone ? inactiveGray : activeWhite)};
  ${({ isDone }) => isDone && 'text-decoration: line-through'};
`;

const ButtonGroupView = styled.View`
  ${cssFlexRow}
  gap: ${themeSize12};
`;
