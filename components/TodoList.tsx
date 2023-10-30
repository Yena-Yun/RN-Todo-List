import styled from 'styled-components/native';
import { CheckIcon, EditIcon, DeleteIcon } from './icons';
import { cssWrap, activeWhite, inactiveGray } from 'styles';
import { Todo, IsDone } from 'types';
import {
  cssFlexRow,
  cssJustifyBetween,
  cssWidthFull,
  themeSize12,
  themeSize16,
} from 'styles';

interface TodoListProps {
  todos: Todo[];
  onCheckTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList = ({
  todos,
  onCheckTodo,
  onDeleteTodo,
}: TodoListProps) => {
  return (
    <Container>
      {todos.map(({ id, content, isDone }) => (
        <TodoView key={id}>
          <TodoTouchable onPress={() => onCheckTodo(id)}>
            <CheckIcon isDone={isDone} />
            <TodoContent isDone={isDone}>{content}</TodoContent>
          </TodoTouchable>
          <FlexView>
            {!isDone && <EditIcon />}
            <DeleteTouchable onPress={() => onDeleteTodo(id)}>
              <DeleteIcon isDone={isDone} />
            </DeleteTouchable>
          </FlexView>
        </TodoView>
      ))}
    </Container>
  );
};

const Container = styled.ScrollView`
  ${cssWidthFull}
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

const FlexView = styled.View`
  ${cssFlexRow}
  gap: ${themeSize12};
`;

const DeleteTouchable = styled.TouchableOpacity``;
