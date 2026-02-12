import { PersonalizedToast } from './Components/PersonalizedToast';
import { AppThemeProvider, ConfirmDialogProvider } from './Contexts';
import { Precificacao3D } from './Pages';
import './Styles/App.css';

function App() {
  return (
    <AppThemeProvider>
      <ConfirmDialogProvider>
        <PersonalizedToast />

        <Precificacao3D />
      </ConfirmDialogProvider>
    </AppThemeProvider>
  );
}

export default App;
