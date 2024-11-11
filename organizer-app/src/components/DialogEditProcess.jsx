import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { updateProcess, createProcess, getProcessesById } from '../services/processService';
import { handleInputChange, handleDropdownChange } from '../utils/formUtils';

function DialogEditProcess({ dialogVisible, onHide, edit, id, onSaveSuccess }) {
    const { state, fetchProcesses, showMessage, showError } = useAppContext();
    const [selectedProcess, setSelectedProcess] = useState(null);
    const [date, setDate] = useState(null);

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
        const getById = async () => {
            if (id) {
                try {
                    const process = await getProcessesById(id);

                    handleSetDate({ value: process?.data?.initDate });

                    setSelectedProcess(process?.data);

                } catch (error) {
                    showError('Erro ao buscar o processo');
                }
            } else {
                clearForm();
            }
        };

        getById();
    }, [id]);

    useEffect(() => {
        if (!edit) {
            clearForm();
        }
    }, [edit]);


    const clearForm = () => {
        setSelectedProcess(null);
        setDate(null);
    }

    const successAction = () => {
        showMessage('Ação realizada com sucesso');
    }

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


    const saveProcess = async () => {
        try {

            edit ? await updateProcess(selectedProcess.id, selectedProcess) : await createProcess(selectedProcess);

            await fetchProcesses();

            successAction();

            onHide(false);

            if (onSaveSuccess)
                onSaveSuccess(true);

            clearForm();
            
        } catch (error) {
            showError('Erro ao salvar processo');

            if (onSaveSuccess)
                onSaveSuccess(false);
        }
    };

    return (
        <Dialog header="Editar Processo" visible={dialogVisible} onHide={() => onHide(false)}>
            <div className="formgrid grid">
                <div className="field col-12 md:col-6">
                    <label htmlFor="name">Nome</label>
                    <InputText
                        id='name'
                        name='name'
                        className='w-full'
                        placeholder='Nome'
                        value={selectedProcess ? selectedProcess.name : ''}
                        onChange={(e) => handleInputChange(e, setSelectedProcess)}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <label htmlFor="responsible">Responsável</label>
                    <InputText
                        id='responsible'
                        name='responsible'
                        className='w-full'
                        placeholder='Responsável'
                        value={selectedProcess ? selectedProcess.responsible : ''}
                        onChange={(e) => handleInputChange(e, setSelectedProcess)}
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
                        name='areaId'
                        emptyMessage='Nenhum resultado encontrado.'
                        className='w-full'
                        value={selectedProcess ? selectedProcess.areaId : null}
                        options={state.areas.map((area) => ({ label: area.name, value: area.id }))}
                        onChange={(e) => handleDropdownChange(e, setSelectedProcess)}
                        placeholder="Selecione uma área"
                    />
                </div>

                <div className="field col-12 md:col-2">
                    <label htmlFor="typeProcess">Tipo de processo</label>
                    <Dropdown
                        id='typeProcess'
                        emptyMessage='Nenhum resultado encontrado.'
                        className='w-full'
                        name='typeProcess'
                        value={selectedProcess ? selectedProcess.typeProcess : null}
                        options={typeProcess.map((area) => ({ label: area.label, value: area.value }))}
                        onChange={(e) => handleDropdownChange(e, setSelectedProcess)}
                        placeholder="Selecione um tipo"
                    />
                </div>

                <div className="field col-12 md:col-3">
                    <label htmlFor="area">Processo Pai</label>
                    <Dropdown
                        id='parentId'
                        name='parentId'
                        emptyMessage='Nenhum resultado encontrado.'
                        className='w-full'
                        value={selectedProcess ? selectedProcess.parentId : null}
                        options={[
                            { label: 'Nenhum', value: null },
                            ...state.processes.map((process) => ({ label: process.name, value: process.id }))
                        ]}
                        onChange={(e) => handleDropdownChange(e, setSelectedProcess)}
                        placeholder="Selecione uma processo pai"
                    />
                </div>

                <div className="field col-12">
                    <label htmlFor="documentation">Documentação</label>
                    <InputText
                        id='documentation'
                        className='w-full'
                        name='documentation'
                        placeholder='Documentação'
                        value={selectedProcess ? selectedProcess.documentation : ''}
                        onChange={(e) => handleInputChange(e, setSelectedProcess)}
                    />
                </div>
                <div className="field col-12">
                    <label htmlFor="tool">Ferramenta</label>
                    <InputText
                        id='tool'
                        className='w-full'
                        name='tools'
                        placeholder='Ferramenta'
                        value={selectedProcess ? selectedProcess.tools : ''}
                        onChange={(e) => handleInputChange(e, setSelectedProcess)}
                    />
                </div>
                <div className='col-12 md:col-6 lg:col-4'>
                    <Button label="Salvar" onClick={saveProcess} />
                </div>
            </div>
        </Dialog >
    )
}


export default DialogEditProcess;