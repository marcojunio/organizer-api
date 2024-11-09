import React from 'react';

export const DetailsModal = ({ process, onClose }) => {
  return (
    <div className="modal">
      <h2>{process.name}</h2>
      <p>Tipo: {process.type}</p>
      {/* Mais detalhes podem ser adicionados aqui */}
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};