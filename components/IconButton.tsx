import { TouchableOpacity, View } from 'react-native';

interface IconButtonProps {
  children: JSX.Element;
  onPress: () => void;
}

export const IconButton = ({ children, onPress }: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>{children}</View>
    </TouchableOpacity>
  );
};
