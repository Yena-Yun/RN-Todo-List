import FeatherIcon from 'react-native-vector-icons/Feather';
import { activeWhite, inactiveGray } from 'styles';
import { IsDone } from 'types';

export const CheckIcon = ({ isDone }: IsDone) => {
  return (
    <FeatherIcon
      name={isDone ? 'check-square' : 'square'}
      size={24}
      color={isDone ? inactiveGray : activeWhite}
    />
  );
};
