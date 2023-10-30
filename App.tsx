import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import styled, { ThemeProvider, css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from './styles/theme';

export default function App() {
  const [input, onChangeInput] = useState('');
  const [todos, setTodos] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const onSubmitEditing = () => {
    setTodos((todos) => [...todos, input]);
    onChangeInput('');
  };

  const onPressTodo = () => {
    setIsDone((isDone) => !isDone);
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
            placeholderTextColor={theme.colors.primary}
            onSubmitEditing={onSubmitEditing}
          />
        </StyledInputView>
        <TodoList>
          {todos.map((todo) => (
            <TodoView key={todo} onPress={onPressTodo}>
              <FlexView>
                <FeatherIcon
                  name={`${isDone ? 'check-square' : 'square'}`}
                  size={24}
                  color={
                    isDone
                      ? theme.colors.inactiveGray
                      : theme.colors.activeWhite
                  }
                />
                <Todo isDone={isDone}>{todo}</Todo>
              </FlexView>
              <FlexView>
                {!isDone && (
                  <MaterialCommunityIcon
                    name='pencil'
                    size={24}
                    color={theme.colors.activeWhite}
                  />
                )}
                <MaterialCommunityIcon
                  name='trash-can-outline'
                  size={24}
                  color={
                    isDone
                      ? theme.colors.inactiveGray
                      : theme.colors.activeWhite
                  }
                />
              </FlexView>
            </TodoView>
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

const FlexView = styled.View`
  flex-direction: row;
  gap: 12px;
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
  width: 100%;
  height: 48px;
  font-size: 20px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.todoGray};
`;

const StyledInput = styled.TextInput`
  ${cssWrap}
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.activeWhite};
`;

const TodoList = styled.ScrollView`
  width: 100%;
`;

const TodoView = styled.TouchableOpacity`
  ${cssWrap}
  flex-direction: row;
  justify-content: space-between;
`;

const Todo = styled.Text<{ isDone: boolean }>`
  color: ${({ theme, isDone }) =>
    isDone ? theme.colors.inactiveGray : theme.colors.activeWhite};
  font-size: 16px;
  ${({ isDone }) => isDone && 'text-decoration: line-through'};
`;
