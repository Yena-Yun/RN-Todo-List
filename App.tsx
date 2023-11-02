import { useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { TextInput, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { CheckIcon, EditIcon, DeleteIcon } from 'components/icons';
import { getItem, setItem } from 'storage/asyncStorage';
import { IsDone, Todo } from 'types';
import * as S from 'styles';

export default function App() {
  const editInputRef = useRef<TextInput | null>(null);
  const [initialInput, onChange] = useState('');
  const [editContent, onEditContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState('');
  const [storageValues, setStorageValues] = useState<Todo[]>([]);

  const saveAsyncStorage = async (newTodos: Todo[]) => {
    try {
      await setItem(newTodos);
      setStorageValues(newTodos);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getAsyncValue();
  }, []);

  const getAsyncValue = async () => {
    const storageTodos = await getItem();
    setStorageValues(storageTodos);
  };

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  const onCreateTodo = () => {
    const newTodo = {
      id: uuid.v4() as string,
      content: initialInput,
      isDone: false,
    };
    saveAsyncStorage([...storageValues, newTodo]);
    onChange('');
  };

  const onCheckTodo = (id: string) => {
    const newTodos = storageValues.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    saveAsyncStorage(newTodos);
  };

  const handleIsEdit = (id: string) => {
    setEditIndex(id);
    setIsEdit(true);
  };

  const onEditTodo = (id: string, editedText: string) => {
    const newTodos = storageValues.map((todo) =>
      todo.id === id ? { ...todo, content: editedText } : todo
    );
    saveAsyncStorage(newTodos);
    onEditContent('');
    setIsEdit(false);
  };

  const onDeleteTodo = (id: string) => {
    const newTodos = storageValues.filter((todo) => todo.id !== id);
    saveAsyncStorage(newTodos);
  };

  useEffect(() => {
    if (editInputRef.current) editInputRef.current.focus();
  }, [isEdit]);

  return (
    <ThemeProvider theme={S.theme}>
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
          {storageValues.length > 0 &&
            storageValues.map(({ id, content, isDone }) => (
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
        <StatusBar barStyle='light-content' backgroundColor={S.bgBlack} />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  ${S.cssFlex1}
  ${S.cssJustifyCenter}
  ${S.cssWidthFull}
  padding: ${S.themeSize20};
  background-color: ${S.themeBgBlack};
`;

const Title = styled.Text`
  margin-bottom: ${S.themeSize12};
  padding-left: ${S.themeSize4};
  font-size: ${S.themeSize32};
  font-weight: ${S.themeWeight500};
  color: ${S.themePrimary};
`;

const TodoInputView = styled.View`
  ${S.cssWidthFull}
`;

const TodoTextInput = styled.TextInput.attrs({
  placeholder: '+ Add a Task',
  placeholderTextColor: S.primary,
})`
  ${S.cssWrap}
  margin-bottom: ${S.themeSize12};
  color: ${S.themeActiveWhite};
`;
const TodoList = styled.ScrollView`
  ${S.cssWidthFull}
`;

const EditTextInput = styled.TextInput`
  width: 90%;
  color: #ffffff;
`;

const TodoView = styled.View`
  ${S.cssWrap}
  ${S.cssFlexRow}
  ${S.cssJustifyBetween}
`;

const TodoTouchable = styled.TouchableOpacity`
  ${S.cssFlexRow}
  gap: ${S.themeSize12};
  width: 80%;
`;

const TodoContent = styled.Text<IsDone>`
  font-size: ${S.themeSize16};
  color: ${({ isDone }) => (isDone ? S.inactiveGray : S.activeWhite)};
  ${({ isDone }) => isDone && 'text-decoration: line-through'};
`;

const ButtonGroupView = styled.View`
  ${S.cssFlexRow}
  gap: ${S.themeSize12};
`;
