import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Area from './pages/Area';
import Process from './pages/Process';
import Hierarchy from './pages/Hierarchy';
import Layout from './components/Layout';
import { locale, addLocale } from 'primereact/api';

addLocale('pt', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
  dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  today: 'Hoje',
  clear: 'Limpar',
});

locale('pt');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Area /> },
      { path: '/area', element: <Area /> },
      { path: '/process', element: <Process /> },
      { path: '/hierarchy', element: <Hierarchy /> },
    ],
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
