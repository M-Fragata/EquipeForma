import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './pages/LandingPage';

export function App() {
  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
