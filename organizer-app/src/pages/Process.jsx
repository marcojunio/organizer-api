import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tooltip } from 'primereact/tooltip';
import React, { useState } from 'react';
import DialogEditProcess from '../components/DialogEditProcess';
import { useAppContext } from '../context/AppContext';
import { deleteProcess } from '../services/processService';

function Process() {
  const { state, fetchProcesses, showError, showMessage } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const [idProcess, setIdProcess] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);


  const editProcess = (edit, id) => {
    setIdProcess(id);
    setIsEdit(edit);
    setDialogVisible(true);
  };

  const successAction = () => {
    showMessage('Ação realizada com sucesso');
  }

  const deleteRequest = async (id) => {
    try {
      await deleteProcess(id);

      await fetchProcesses();

      successAction();
    } catch (error) {
      showError('Erro ao deletar processo');
    }
  };

  const processActionBody = (rowData) => (
    <div className="content-area">
      <div>
        <Tooltip target=".edit-tooltip" />
        <a className='edit-tooltip a-icon-click secondary'
          data-pr-tooltip="Editar"
          data-pr-position="center"
          onClick={() => editProcess(true, rowData.id)}>
          <i className='pi pi-pencil'></i>
        </a>
      </div>
      <div>
        <Tooltip target=".delete-tooltip" />
        <a
          data-pr-tooltip="Deletar"
          data-pr-position="center"
          className='delete-tooltip a-icon-click danger' onClick={() => deleteRequest(rowData.id)}>
          <i className='pi pi-trash'></i>
        </a>
      </div>
    </div>
  );

  const typeProcessBody = (rowData) => {
    if (!rowData.typeProcess) {
      return;
    }

    const templateManual =
      <>
        <i
          data-pr-tooltip="Manual"
          data-pr-position="center"
          style={{ fontSize: '1rem' }}
          className='custom-target-icon pi pi-user'>
        </i>
        <Tooltip showDelay={200} hideDelay={500} target=".custom-target-icon-manual" />
      </>

    const templateAutomatic =
      <>
        <i
          data-pr-tooltip="Automático"
          data-pr-position="center"
          style={{ fontSize: '1rem' }}
          className='custom-target-icon-automatic pi pi-cog'>
        </i>
        <Tooltip showDelay={200} hideDelay={500} target=".custom-target-icon-automatic" />
      </>

    return rowData.typeProcess === 'Manual' ? templateManual : templateAutomatic
  };

  return (
    <div>
      <h2 className='mt-6' >Processos</h2>

      <div className='mt-2'>
        
        <div className="flex flex-wrap align-items-center justify-content-end mb-3">
          <Button
            label="Novo processo"
            icon="pi pi-plus"
            onClick={() => editProcess(false, null)}
            className="mb-3"
          />
        </div>

        <DataTable paginator rows={5} emptyMessage='Nenhum resultado encontrado.' rowsPerPageOptions={[5, 10, 25, 50]} value={state.processes}>
          <Column field="name" sortable header="Nome do Processo" />
          <Column field="responsible" sortable header="Responsável" />
          <Column field="tools" sortable header="Ferramenta" />
          <Column field="typeProcess" sortable header="Tipo do processo" align={'center'} body={typeProcessBody} />
          <Column align={'center'} body={processActionBody} header="Ações" />
        </DataTable>
      </div>

      <DialogEditProcess id={idProcess} edit={isEdit} onHide={() => setDialogVisible(false)} dialogVisible={dialogVisible} >
      </DialogEditProcess>
    </div >
  );
}

export default Process;
