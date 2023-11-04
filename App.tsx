import { Fragment, useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { TextInput, Dimensions } from 'react-native';
import uuid from 'react-native-uuid';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { TodoInput } from 'components/TodoInput';
import { TodoTask } from 'components/TodoTask';
import { getItem, setItem } from 'storage/asyncStorage';
import * as S from 'styles';
import { Todo } from 'types';

export default function App() {
  const editInputRef = useRef<TextInput | null>(null);
  const [initialInput, onChange] = useState('');
  const [editContent, onEditContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState('');
  const [storageValues, setStorageValues] = useState<Todo[]>([]);
  const width = Dimensions.get('window').width;

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

  const onCreateTask = () => {
    if (!initialInput) return;

    const newTodo = {
      id: uuid.v4() as string,
      content: initialInput,
      isDone: false,
    };
    saveAsyncStorage([newTodo, ...storageValues]); // 인풋 칠 때 바뀌는 거 + 순서 역순 (해결!!)
    onChange('');
  };

  const onToggleTask = (id: string) => {
    const newTodos = storageValues.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    saveAsyncStorage(newTodos);
  };

  const handleIsEdit = (id: string) => {
    setEditIndex(id);
    setIsEdit(true);
  };

  const onEditTask = (id: string, editedText: string) => {
    const newTodos = storageValues.map((todo) =>
      todo.id === id ? { ...todo, content: editedText } : todo
    );
    saveAsyncStorage(newTodos);
    onEditContent('');
    setIsEdit(false);
  };

  const onDeleteTask = (id: string) => {
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
        <TodoInput
          value={initialInput}
          onChangeText={onChange}
          onSubmitEditing={onCreateTask}
          placeholder='+ Add a Task'
        />
        <TodoList width={width}>
          {storageValues.length > 0 &&
            storageValues.map(({ id, content, isDone }) => {
              return (
                <Fragment key={id}>
                  {isEdit && id === editIndex ? (
                    <TodoInput
                      ref={editInputRef}
                      value={editContent}
                      onChangeText={onEditContent}
                      onSubmitEditing={() => onEditTask(id, editContent)}
                      placeholder='Edit a Task'
                    />
                  ) : (
                    <TodoTask
                      task={{ id, content, isDone }}
                      onToggleTask={onToggleTask}
                      handleIsEdit={handleIsEdit}
                      onDeleteTask={onDeleteTask}
                    />
                  )}
                </Fragment>
              );
            })}
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

const TodoList = styled.ScrollView<{ width: number }>`
  width: ${({ width }) => width - 40}px;
`;
