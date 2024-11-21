import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Painel from './pages/index';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Painel />
    </QueryClientProvider>
  );
}

export default App;
