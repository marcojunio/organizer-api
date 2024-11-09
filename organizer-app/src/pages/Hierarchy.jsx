import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Tree } from 'primereact/tree';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTreeProcess } from '../services/processService';

function Hierarchy() {
  const { state, fetchAreas, showError } = useAppContext();
  const [areaId, setAreaId] = useState('');
  const [nodes, setNode] = useState([]);

  useEffect(() => {
    fetchAreas();
  }, []);


  const fetchProcess = async () => {
    if (!areaId) {
      showError('Nenhuma área selecionada');

      return;
    }

    const response = await getTreeProcess(areaId);

    const treeNode = response?.data?.map((element) => {
      return parseNode(element);
    });

    setNode(treeNode)
  }

  const parseNode = (node) => {
    const data = {
      id: node?.id,
      label: node?.name,
      icon: node?.typeProcess === 'Manual' ? 'pi pi-user' : 'pi pi-cog',
      children: node?.children ? node.children.map(child => parseNode(child)) : null
    }

    return data;
  }

  return (
    <div>
      <h2 className='mt-6'>Consulte uma hierarquia de processos por área</h2>

      <div className='mt-6 formgrid grid'>
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
        <Tree filterMode="lenient" filter  filterPlaceholder="Filtrar por nome" value={nodes} emptyMessage='Nenhum resultado encontrado.' className="w-full md:w-30rem" />
      </div>
    </div >
  );
}

export default Hierarchy;
