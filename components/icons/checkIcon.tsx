import FeatherIcon from 'react-native-vector-icons/Feather';
import { activeWhite, inactiveGray } from 'styles';

interface CheckIconProps {
  size?: number;
  isDone?: boolean;
}

export const CheckIcon = ({ size, isDone }: CheckIconProps) => {
  return (
    <FeatherIcon
      name={isDone ? 'check-square' : 'square'}
      size={size}
      color={isDone ? inactiveGray : activeWhite}
    />
  );
};
