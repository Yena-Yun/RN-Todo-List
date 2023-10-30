import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';

const theme = {
  colors: {
    bgBlack: '#111111',
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledText>Open up App.tsx to start working on your app!</StyledText>
        <StatusBar style='auto' />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bgBlack};
  justify-content: center;
  align-items: center;
`;

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
