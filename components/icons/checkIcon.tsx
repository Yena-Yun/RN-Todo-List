import FeatherIcon from 'react-native-vector-icons/Feather';
import { activeWhite, inactiveGray } from 'styles';

interface CheckIconProps {
  isDone: boolean;
}

export const CheckIcon = ({ isDone }: CheckIconProps) => {
  return (
    <FeatherIcon
      name={`${isDone ? 'check-square' : 'square'}`}
      size={24}
      color={isDone ? inactiveGray : activeWhite}
    />
  );
};
