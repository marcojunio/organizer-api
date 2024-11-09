import React, { useState } from 'react';
import { AreaForm } from './components/AreaForm/AreaForm';
import { ProcessForm } from './components/ProcessForm/ProcessForm';
import { ProcessTree } from './components/ProcessTree/ProcessTree';
import { DetailsModal } from './components/DetailsModal/DetailsModal';
import { ProcessProvider } from './context/ProcessContext';

const App = () => {
  const [selectedProcess, setSelectedProcess] = useState(null);

  return (
    <ProcessProvider>
      <div className="app-container">
        <h1>Gestão de Processos</h1>
        <AreaForm />
        {/* <ProcessForm />
        <ProcessTree /> */}
        {selectedProcess && (
          <DetailsModal
            process={selectedProcess}
            onClose={() => setSelectedProcess(null)}
          />
        )}
      </div>
    </ProcessProvider>
  );
};

export default App