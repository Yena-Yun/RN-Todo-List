import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from 'types';

export const setItem = async (value: Todo[]) => {
  try {
    await AsyncStorage.setItem('myTodoList', JSON.stringify(value));
  } catch (err) {
    throw err;
  }
};

export const getItem = async (): Promise<Todo[]> => {
  try {
    const value = await AsyncStorage.getItem('myTodoList');
    const result = value && JSON.parse(value);
    return result as Todo[];
  } catch (err) {
    throw err;
  }
};
