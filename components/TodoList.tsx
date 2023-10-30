import styled from 'styled-components/native';
import { CheckIcon, EditIcon, DeleteIcon } from './icons';
import { cssWrap, activeWhite, inactiveGray } from 'styles';
import { Todo, IsDone } from 'types';

interface TodoListProps {
  todos: Todo[];
  onCheckTodo: (id: string) => void;
}

export const TodoList = ({ todos, onCheckTodo }: TodoListProps) => {
  return (
    <Container>
      {todos.map(({ id, content, isDone }) => (
        <TodoView key={id} onPress={() => onCheckTodo(id)}>
          <FlexView>
            <CheckIcon isDone={isDone} />
            <TodoContent isDone={isDone}>{content}</TodoContent>
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

const TodoContent = styled.Text<IsDone>`
  color: ${({ isDone }) => (isDone ? inactiveGray : activeWhite)};
  font-size: 16px;
  ${({ isDone }) => isDone && 'text-decoration: line-through'};
`;
