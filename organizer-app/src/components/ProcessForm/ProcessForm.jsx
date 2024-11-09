import React, { useState, useEffect } from 'react';
import { useProcessContext } from '../../context/ProcessContext';
import { createProcess, getProcesses } from '../../services/processService';

export const ProcessForm = ({ parentId = null }) => {
  const { dispatch } = useProcessContext();
  const [name, setName] = useState('');
  const [type, setType] = useState('manual');

  useEffect(() => {
    // Carregar processos ao montar o componente
    const fetchProcesses = async () => {
      const processes = await getProcesses();
      processes.forEach((process) => dispatch({ type: 'ADD_PROCESS', payload: process }));
    };
    fetchProcesses();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProcess = await createProcess({ name, type, parentId });
    dispatch({ type: 'ADD_PROCESS', payload: newProcess });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do Processo"
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="manual">Manual</option>
        <option value="systematic">Sistemático</option>
      </select>
      <button type="submit">Adicionar Processo</button>
    </form>
  );
};