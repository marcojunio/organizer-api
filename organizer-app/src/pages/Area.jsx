import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { createArea, deleteArea, updateArea } from '../services/areaService';
import { handleInputChange } from '../utils/formUtils';

function Area() {
  const { state, fetchAreas, fetchProcesses, showError, showMessage } = useAppContext();
  const [selectedArea, setSelectedArea] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const editArea = (area, edit) => {
    setSelectedArea(area);
    setIsEdit(edit);
    setDialogVisible(true);
  };

  const successAction = () => {
    showMessage('Ação realizada com sucesso');
  }

  const saveArea = async () => {
    try {

      isEdit ? await updateArea(selectedArea.id, selectedArea) : await createArea(selectedArea);

      await fetchAreas();

      successAction();

      setDialogVisible(false);
    } catch (error) {
      showError('Erro ao salvar área');
    }
  };

  const deleteRequest = async (id) => {
    try {
      await deleteArea(id);

      await fetchAreas();

      await fetchProcesses();

      successAction();
    } catch (error) {
      console.log(error);
      showError('Erro ao deletar área');
    }
  };

  const areaActionBody = (rowData) => (
    <div className="content-area">
      <div>
        <Tooltip target=".edit-tooltip" />
        <a className='edit-tooltip a-icon-click secondary'
          data-pr-tooltip="Editar"
          data-pr-position="center"
          onClick={() => editArea(rowData, true)}>
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

  return (
    <div>
      <h2 className='mt-6'>Áreas</h2>

      <div className="mt-2">

        <div className="flex flex-wrap align-items-center justify-content-end mb-3">
          <Button label="Nova área" icon="pi pi-plus" onClick={() => editArea(null, false)} className="mb-3" />
        </div>

        <DataTable  selectOnEdit={true} paginator emptyMessage='Nenhum resultado encontrado.' rows={5} rowsPerPageOptions={[5, 10, 25, 50]} value={state.areas}>
          <Column field="name" sortable header="Nome da Área" />
          <Column align={'center'} body={areaActionBody} header="Ações" />
        </DataTable>
      </div>

      <Dialog header={isEdit ? 'Editar área' : 'Nova área'} visible={dialogVisible} onHide={() => setDialogVisible(false)}>
        <div className="content-area">
          <div>
            <InputText
              name='name'
              placeholder='Nome'
              value={selectedArea?.name}
              onChange={(e) => handleInputChange(e, setSelectedArea)}
            />
          </div>

          <div className="flex flex-wrap align-items-center justify-content-end">
            <Button label="Cancelar" className='mr-2' severity="danger" onClick={() => setDialogVisible(false)} />
            <Button label="Salvar" onClick={saveArea} />
          </div>

        </div>
      </Dialog>
    </div>
  );
}

export default Area;