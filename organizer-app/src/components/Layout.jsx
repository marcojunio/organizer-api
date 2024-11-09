import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { Dialog } from 'primereact/dialog';
import { useAppContext } from '../context/AppContext';

function Layout() {
  const { state, hideDialog } = useAppContext();

  const navigate = useNavigate();

  const items = [
    { label: 'Área', command: () => navigate('/area') },
    { label: 'Processo', command: () => navigate('/process') },
    { label: 'Hierarquia de processos', command: () => navigate('/hierarchy') },
  ];

  return (
    <div className='v-ctn mt-5'>
      <TabMenu model={items} />
      <div className="content">
        <Outlet />
      </div>

      <Dialog
        header={state.dialog.type === 'error' ? 'Erro' : 'Sucesso'}
        visible={state.dialog.visible}
        onHide={hideDialog}
        style={{ width: '350px' }}
      >
        <p>{state.dialog.message}</p>
      </Dialog>
    </div>
  );
}

export default Layout;
