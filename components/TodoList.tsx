import { useState } from 'react';
import styled from 'styled-components/native';
import { CheckIcon, EditIcon, DeleteIcon } from './icons';
import { cssWrap, activeWhite, inactiveGray } from 'styles';

interface TodoListProps {
  todos: string[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  const [isDone, setIsDone] = useState(false);

  const onPressTodo = () => {
    setIsDone((isDone) => !isDone);
  };

  return (
    <Container>
      {todos.map((todo) => (
        <TodoView key={todo} onPress={onPressTodo}>
          <FlexView>
            <CheckIcon isDone={isDone} />
            <Todo isDone={isDone}>{todo}</Todo>
          </FlexView>
          <FlexView>
            {!isDone && <EditIcon />}
            <DeleteIcon isDone={isDone} />
          </FlexView>
        </TodoView>
      ))}
    </Container>
  );
};

const FlexView = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const Container = styled.ScrollView`
  width: 100%;
`;

const TodoView = styled.TouchableOpacity`
  ${cssWrap}
  flex-direction: row;
  justify-content: space-between;
`;

const Todo = styled.Text<{ isDone: boolean }>`
  color: ${({ theme, isDone }) => (isDone ? inactiveGray : activeWhite)};
  font-size: 16px;
  ${({ isDone }) => isDone && 'text-decoration: line-through'};
`;
