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
import { DeviceWidth, Todo } from 'types';

export default function App() {
  const inputRef = useRef<TextInput | null>(null);
  const [initialInput, onChange] = useState('');
  const [editContent, onEditContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState('');
  const [storageValues, setStorageValues] = useState<Todo[]>([]);
  const width = Dimensions.get('window').width;

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  const saveAsyncValue = async (newTodos: Todo[]) => {
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

  const onCreateTask = () => {
    if (!initialInput) return;

    const newTodo = {
      id: uuid.v4() as string,
      content: initialInput,
      isDone: false,
    };
    saveAsyncValue([newTodo, ...storageValues]); // 인풋 칠 때 바뀌는 거 + 순서 역순 (해결!!)
    onChange('');
  };

  const onToggleTask = (id: string) => {
    const newTodos = storageValues.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    saveAsyncValue(newTodos);
  };

  const handleIsEdit = (id: string) => {
    setEditIndex(id);
    setIsEdit(true);
  };

  const onEditTask = (id: string, editedText: string) => {
    const newTodos = storageValues.map((todo) =>
      todo.id === id ? { ...todo, content: editedText } : todo
    );
    saveAsyncValue(newTodos);
    onEditContent('');
    setIsEdit(false);
  };

  const onDeleteTask = (id: string) => {
    const newTodos = storageValues.filter((todo) => todo.id !== id);
    saveAsyncValue(newTodos);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isEdit]);

  return (
    <ThemeProvider theme={S.theme}>
      <Container>
        <Title>TODO List</Title>
        <TodoInput
          ref={inputRef}
          value={initialInput}
          onChangeText={onChange}
          onSubmitEditing={onCreateTask}
          onBlur={() => onChange('')}
          placeholder='+ Add a Task'
        />
        <TodoList width={width}>
          {storageValues.length > 0 &&
            storageValues.map(({ id, content, isDone }) => (
              <Fragment key={id}>
                {isEdit && id === editIndex ? (
                  <TodoInput
                    ref={inputRef}
                    value={editContent}
                    onChangeText={onEditContent}
                    onSubmitEditing={() => onEditTask(id, editContent)}
                    onBlur={() => {
                      onEditContent('');
                      setIsEdit(false);
                    }}
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

const TodoList = styled.ScrollView<DeviceWidth>`
  width: ${({ width }) => width - 40}px;
`;
