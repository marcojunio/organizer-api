import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { createArea, updateArea, deleteArea } from '../services/areaService';

function Area() {
  const { state, fetchAreas, showError, showMessage } = useAppContext();
  const [selectedArea, setSelectedArea] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchAreas();
    })();
  }, []);

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

      successAction();
    } catch (error) {
      showError('Erro ao deletar área');
    }
  };

  const areaActionBody = (rowData) => (
    <div className="content-area">
      <div>
        <Button label="Editar" icon="pi pi-pencil" className='p-button-secondary' onClick={() => editArea(rowData, true)} />
      </div>
      <div>
        <Button label="Excluir" icon="pi pi-trash" onClick={() => deleteRequest(rowData.id)} className="p-button-danger ml-2" />
      </div>
    </div>
  );

  return (
    <div>
      <h2 className='mt-6'>Áreas</h2>

      <div className="mt-6">
        <Button label="Nova Área" icon="pi pi-plus"  onClick={() => editArea(null, false)} className="mb-3" />
        <DataTable paginator emptyMessage='Nenhum resultado encontrado.'  rows={5} rowsPerPageOptions={[5, 10, 25, 50]} value={state.areas}>
          <Column field="name" header="Nome da Área" />
          <Column body={areaActionBody} header="Ações" />
        </DataTable>
      </div>

      <Dialog header="Editar Área" visible={dialogVisible} onHide={() => setDialogVisible(false)}>
        <div className="content-area">
          <div>
            <InputText
              placeholder='Nome'
              value={selectedArea ? selectedArea.name : ''}
              onChange={(e) => setSelectedArea({ ...selectedArea, name: e.target.value })}
            />
          </div>
          <div>
            <Button label="Salvar" onClick={saveArea} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Area;
