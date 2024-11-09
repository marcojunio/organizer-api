import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { createProcess, deleteProcess, updateProcess } from '../services/processService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import { Calendar } from 'primereact/calendar';

function Process() {
  const { state, fetchProcesses, fetchAreas, showError, showMessage } = useAppContext();
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [date, setDate] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const typeProcess = [
    {
      label: 'Manual',
      value: 'Manual'
    },
    {
      label: 'Automático',
      value: 'Automatic'
    }
  ]

  useEffect(() => {
    (async () => {
      await fetchAreas();
      await fetchProcesses();
    })();
  }, []);

  const editProcess = (process, edit) => {

    if (process?.initDate) {
      handleSetDate({ value: process?.initDate })
    }

    setSelectedProcess(process);
    setIsEdit(edit);
    setDialogVisible(true);
  };

  const successAction = () => {
    showMessage('Ação realizada com sucesso');
  }

  const saveProcess = async () => {
    try {

      isEdit ? await updateProcess(selectedProcess.id, selectedProcess) : await createProcess(selectedProcess);

      await fetchProcesses();

      successAction();

      setDialogVisible(false);
    } catch (error) {
      showError('Erro ao salvar processo');
    }
  };

  const handleSetDate = (e) => {
    if (typeof e?.value === 'string') {
      setDate(new Date(e?.value));
      return;
    }

    const selectedDate = e.value;

    const formattedDate = selectedDate.toISOString();

    setDate(formattedDate);

    setSelectedProcess({ ...selectedProcess, initDate: formattedDate })
  };

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
        <Button label="Editar" icon="pi pi-pencil" className='p-button-secondary'  onClick={() => editProcess(rowData, true)} />
      </div>
      <div>
        <Button label="Excluir" icon="pi pi-trash" onClick={() => deleteRequest(rowData.id)} className="p-button-danger ml-2" />
      </div>
    </div>
  );

  const typeProcessBody = (rowData) => {
    if (!rowData.typeProcess) {
      return;
    }

    const templateManual = <i
      data-pr-tooltip="Manual"
      data-pr-position="center"
      style={{ fontSize: '1rem' }}
      className='custom-target-icon pi pi-user'>
    </i>

    const templateAutomatic = <i
      data-pr-tooltip="Automático"
      data-pr-position="center"
      style={{ fontSize: '1rem' }}
      className='custom-target-icon pi pi-cog'>
    </i>

    return rowData.typeProcess === 'Manual' ? templateManual : templateAutomatic
  };

  return (
    <div>
      <h2 className='mt-6' >Cadastro de Processos</h2>
      <div className='mt-6'>
        <Button label="Novo processo" icon="pi pi-plus" onClick={() => editProcess(null, false)} className="mb-3" />

        <Tooltip target=".custom-target-icon" />
        <DataTable paginator rows={5} emptyMessage='Nenhum resultado encontrado.' rowsPerPageOptions={[5, 10, 25, 50]} value={state.processes}>
          <Column field="name" header="Nome do Processo" />
          <Column field="responsible" header="Responsável" />
          <Column field="tools" header="Ferramenta" />
          <Column field="typeProcess" header="Tipo do processo" align={'center'} body={typeProcessBody} />
          <Column body={processActionBody} header="Ações" />
        </DataTable>
      </div>

      <Dialog header="Editar Processo" visible={dialogVisible} onHide={() => setDialogVisible(false)}>
        <div className="formgrid grid">
          <div className="field col-12 md:col-6">
            <label htmlFor="name">Nome</label>
            <InputText
              id='name'
              className='w-full'
              placeholder='Nome'
              value={selectedProcess ? selectedProcess.name : ''}
              onChange={(e) => setSelectedProcess({ ...selectedProcess, name: e.target.value })}
            />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="responsible">Responsável</label>
            <InputText
              id='responsible'
              className='w-full'
              placeholder='Responsável'
              value={selectedProcess ? selectedProcess.responsible : ''}
              onChange={(e) => setSelectedProcess({ ...selectedProcess, responsible: e.target.value })}
            />
          </div>

          <div className="field col-12 md:col-4">
            <label htmlFor="date">Data de início</label>
            <Calendar
              locale='pt'
              id='date'
              placeholder='Data de início'
              className='w-full'
              value={date ? new Date(date) : null}
              onChange={handleSetDate}
              dateFormat="dd/mm/yy"
              showTime
              hourFormat='24'
            />
          </div>

          <div className="field col-12 md:col-3">
            <label htmlFor="area">Área</label>
            <Dropdown
              id='area'
              emptyMessage='Nenhum resultado encontrado.'
              className='w-full'
              value={selectedProcess ? selectedProcess.areaId : null}
              options={state.areas.map((area) => ({ label: area.name, value: area.id }))}
              onChange={(e) => setSelectedProcess({ ...selectedProcess, areaId: e.value })}
              placeholder="Selecione uma área"
            />
          </div>

          <div className="field col-12 md:col-2">
            <label htmlFor="typeProcess">Tipo de processo</label>
            <Dropdown
              id='typeProcess'
              emptyMessage='Nenhum resultado encontrado.'
              className='w-full'
              value={selectedProcess ? selectedProcess.typeProcess : null}
              options={typeProcess.map((area) => ({ label: area.label, value: area.value }))}
              onChange={(e) => setSelectedProcess({ ...selectedProcess, typeProcess: e.value })}
              placeholder="Selecione um tipo"
            />
          </div>

          <div className="field col-12 md:col-3">
            <label htmlFor="area">Processo Pai</label>
            <Dropdown
              id='area'
              emptyMessage='Nenhum resultado encontrado.'
              className='w-full'
              value={selectedProcess ? selectedProcess.parentId : null}
              options={state.processes.map((process) => ({ label: process.name, value: process.id }))}
              onChange={(e) => setSelectedProcess({ ...selectedProcess, parentId: e.value })}
              placeholder="Selecione uma processo pai"
            />
          </div>

          <div className="field col-12">
            <label htmlFor="documentation">Documentação</label>
            <InputText
              id='documentation'
              className='w-full'
              placeholder='Documentação'
              value={selectedProcess ? selectedProcess.documentation : ''}
              onChange={(e) => setSelectedProcess({ ...selectedProcess, documentation: e.target.value })}
            />
          </div>
          <div className="field col-12">
            <label htmlFor="tool">Ferramenta</label>
            <InputText
              id='tool'
              className='w-full'
              placeholder='Ferramenta'
              value={selectedProcess ? selectedProcess.tools : ''}
              onChange={(e) => setSelectedProcess({ ...selectedProcess, tools: e.target.value })}
            />
          </div>



          <div className='col-12 md:col-6 lg:col-4'>
            <Button label="Salvar" onClick={saveProcess} />
          </div>
        </div>



      </Dialog >
    </div >
  );
}

export default Process;
