import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { activeWhite, inactiveGray } from 'styles';

interface DeleteIconProps {
  isDone: boolean;
}

export const DeleteIcon = ({ isDone }: DeleteIconProps) => {
  return (
    <MaterialCommunityIcon
      name='trash-can-outline'
      size={24}
      color={isDone ? inactiveGray : activeWhite}
    />
  );
};
