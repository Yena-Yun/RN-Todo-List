import styled from 'styled-components/native';
import { IconButton } from 'components/IconButton';
import { CheckIcon, EditIcon, DeleteIcon } from 'components/icons';
import * as S from 'styles';
import { IsDone } from 'types';

interface TodoTaskProps {
  task: {
    id: string;
    content: string;
    isDone: boolean;
  };
  onCheckTodo: (id: string) => void;
  handleIsEdit: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoTask = ({
  task,
  onCheckTodo,
  handleIsEdit,
  onDeleteTodo,
}: TodoTaskProps) => {
  const { id, content, isDone } = task;

  const _onCheckTodo = () => {
    onCheckTodo(id);
  };

  const _handleIsEdit = () => {
    handleIsEdit(id);
  };

  const _onDeleteTodo = () => {
    onDeleteTodo(id);
  };

  return (
    <TodoView>
      <TodoTouchable onPress={_onCheckTodo}>
        <CheckIcon size={24} isDone={isDone} />
        <TodoContent isDone={isDone}>{content}</TodoContent>
      </TodoTouchable>
      <ButtonGroupView>
        {!isDone && (
          <IconButton onPress={_handleIsEdit}>
            <EditIcon size={24} color={S.activeWhite} />
          </IconButton>
        )}
        <IconButton onPress={_onDeleteTodo}>
          <DeleteIcon size={24} isDone={isDone} />
        </IconButton>
      </ButtonGroupView>
    </TodoView>
  );
};

const TodoView = styled.View`
  ${S.cssTodoContainer}
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
