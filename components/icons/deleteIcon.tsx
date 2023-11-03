import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { activeWhite, inactiveGray } from 'styles';

interface DeleteIconProps {
  size?: number;
  isDone?: boolean;
}

export const DeleteIcon = ({ size, isDone }: DeleteIconProps) => {
  return (
    <MaterialCommunityIcon
      name='trash-can-outline'
      size={size}
      color={isDone ? inactiveGray : activeWhite}
    />
  );
};
