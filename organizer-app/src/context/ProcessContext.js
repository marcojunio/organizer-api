import React, { createContext, useReducer, useContext } from 'react';
import { processReducer } from './ProcessReducer';

const ProcessContext = createContext();

export const ProcessProvider = ({ children }) => {
  const [state, dispatch] = useReducer(processReducer, {
    areas: [],
    processes: [],
  });

  return (
    <ProcessContext.Provider value={{ state, dispatch }}>
      {children}
    </ProcessContext.Provider>
  );
};

export const useProcessContext = () => useContext(ProcessContext);