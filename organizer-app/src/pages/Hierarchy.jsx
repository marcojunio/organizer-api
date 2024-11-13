import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Tree } from 'primereact/tree';
import React, { useState } from 'react';
import DialogEditProcess from '../components/DialogEditProcess';
import { useAppContext } from '../context/AppContext';
import { getTreeProcess } from '../services/processService';

function Hierarchy() {
  const { state, showError } = useAppContext();
  const [areaId, setAreaId] = useState('');
  const [node, setNode] = useState([]);
  const [idProcess, setIdProcess] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);



  const fetchProcess = async () => {
    if (!areaId) {
      showError('Nenhuma área selecionada');

      return;
    }

    const response = await getTreeProcess(areaId);

    const treeNode = response?.data?.map((element) => {
      return parseNode(element, "0");
    });

    setNode(treeNode)
  }

  const parseNode = (node, parentKey) => {
    const data = {
      id:node?.id,
      key: parentKey + node?.id,
      label: node?.name,
      icon: node?.typeProcess === 'Manual' ? 'pi pi-user' : 'pi pi-cog',
      children: node?.children
        ? node.children.map((child, index) => parseNode(child, `${parentKey}-${index}`))
        : null
    }

    return data;
  }


  const onSelect = (data) => {
    setIdProcess(data?.node?.id);
    setDialogVisible(true);
  }

  const handleOnSaveSuccess = (saveSuccess) => {
    if (saveSuccess) {
      fetchProcess();
    }
  }

  return (
    <div>
      <h2 className='mt-6'>Consulte uma hierarquia por área</h2>

      <div className='mt-2 formgrid grid'>
        <div className='field col-12 md:col-6'>
          <Dropdown
            className='w-full'
            emptyMessage='Nenhum resultado encontrado.'
            value={areaId}
            options={state.areas.map((area) => ({ label: area.name, value: area.id }))}
            onChange={(e) => setAreaId(e.value)}
            placeholder="Selecione uma área"
          />
        </div>
      </div>
      <Button label="Buscar" onClick={fetchProcess} />

      <div className='mt-8'>
        {node && node.length > 0 && (
          <Tree
            filterMode="lenient"
            selectionMode="single"
            onSelect={(e) => onSelect(e)}
            filter
            filterPlaceholder="Filtrar por nome"
            value={node}
            emptyMessage='Nenhum resultado encontrado.'
            className="w-full"
          />
        )}
      </div>

      <DialogEditProcess onSaveSuccess={(e) => handleOnSaveSuccess(e)} id={idProcess} edit={true} onHide={() => setDialogVisible(false)} dialogVisible={dialogVisible} >
      </DialogEditProcess>

    </div >
  );
}

export default Hierarchy;
