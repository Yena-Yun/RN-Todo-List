import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface EditIconProps {
  size?: number;
  color?: string;
}

export const EditIcon = ({ size, color }: EditIconProps) => {
  return <MaterialCommunityIcon name='pencil' size={size} color={color} />;
};
