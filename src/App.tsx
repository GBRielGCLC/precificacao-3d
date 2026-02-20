import { PersonalizedToast } from './Components/PersonalizedToast';
import { AppThemeProvider, ConfirmDialogProvider } from './Contexts';
import { AppConfigProvider } from './Contexts/AppConfigContext';
import { Precificacao3D } from './Pages';
import './Styles/App.css';

function App() {
  return (
    <AppThemeProvider>
      <ConfirmDialogProvider>
        <PersonalizedToast />
        <AppConfigProvider>

          <div id="stars1" />
          <div id="stars2" />
          <div id="stars3" />

          <Precificacao3D />          
        </AppConfigProvider>
      </ConfirmDialogProvider>
    </AppThemeProvider>
  );
}

export default App;
