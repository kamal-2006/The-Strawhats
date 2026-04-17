import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './contexts/ThemeContext';
import { InsuranceProvider } from './contexts/InsuranceContext';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <ThemeProvider>
      <InsuranceProvider>
        <RouterProvider router={router} />
        <Toaster />
      </InsuranceProvider>
    </ThemeProvider>
  );
}

export default App;
