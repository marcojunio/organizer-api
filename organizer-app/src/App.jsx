import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Area from './pages/Area';
import Process from './pages/Process';
import Hierarchy from './pages/Hierarchy';
import Layout from './components/Layout';
import { initSetup } from './setupApplication';


initSetup();

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
