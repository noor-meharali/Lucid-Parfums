import { ToastProvider } from '@/context/ToastContext';
import { AppRouter } from '@/routes/AppRouter';

function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
}

export default App;
