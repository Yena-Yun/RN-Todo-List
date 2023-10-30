import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function App() {
  return (
    <View style={styles.container}>
      <StyledText>Open up App.tsx to start working on your app!</StyledText>
      <StatusBar style='auto' />
    </View>
  );
}

const StyledText = styled.Text`
  color: palevioletred;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
