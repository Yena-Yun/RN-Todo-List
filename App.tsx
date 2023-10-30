import { StatusBar } from 'expo-status-bar';
import styled, { ThemeProvider } from 'styled-components/native';

const theme = {
  colors: {
    primary: '#818fc0',
    activeWhite: '#cecece',
    inactiveGray: '#616161',
    todoGray: '#313131',
    bgBlack: '#101010',
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>TODO List</Title>
        <StyledInputView>
          <StyledInput
            placeholder='+ Add a Task'
            placeholderTextColor={theme.colors.primary}
          />
        </StyledInputView>
        <StatusBar style='auto' />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  width: 100%;
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.bgBlack};
  justify-content: center;
`;

const Title = styled.Text`
  padding-left: 4px;
  margin-bottom: 12px;
  font-size: 32px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledInputView = styled.View`
  width: 100%;
`;

const StyledInput = styled.TextInput`
  height: 48px;
  font-size: 20px;
  padding: 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.activeWhite};
  background-color: ${({ theme }) => theme.colors.todoGray};
`;
