import React, { useState, useEffect } from 'react';
import { useProcessContext } from '../../context/ProcessContext';
import { createArea, getAreas } from '../../services/areaService';

export const AreaForm = () => {
  const { dispatch } = useProcessContext();
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchAreas = async () => {
      const areas = await getAreas();
      areas.forEach((area) => dispatch({ type: 'ADD_AREA', payload: area }));
    };
    fetchAreas();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArea = await createArea({ name });
    dispatch({ type: 'ADD_AREA', payload: newArea });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da Área"
        required
      />
      <button type="submit">Adicionar Área</button>
    </form>
  );
};