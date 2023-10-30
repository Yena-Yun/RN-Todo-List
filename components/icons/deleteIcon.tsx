import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { activeWhite, inactiveGray } from 'styles';
import { IsDone } from 'types';

export const DeleteIcon = ({ isDone }: IsDone) => {
  return (
    <MaterialCommunityIcon
      name='trash-can-outline'
      size={24}
      color={isDone ? inactiveGray : activeWhite}
    />
  );
};
