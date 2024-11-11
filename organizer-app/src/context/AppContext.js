import React, {
  createContext,
  useReducer,
  useContext,
  useEffect
} from 'react';
import {
  getProcesses
} from '../services/processService';
import {
  getAreas
} from '../services/areaService';

const initialState = {
  areas: [],
  processes: [],
  dialog: {
    visible: false,
    message: '',
    type: 'error' | 'success'
  },
};

const AppContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_AREAS':
      return {
        ...state, areas: action.payload
      };
    case 'SET_PROCESSES':
      return {
        ...state, processes: action.payload
      };
    case 'SHOW_DIALOG':
      return {
        ...state, dialog: {
          visible: true,
          message: action.payload.message,
          type: action.payload.type
        }
      };
    case 'HIDE_DIALOG':
      return {
        ...state, dialog: {
          ...state.dialog,
          visible: false
        }
      };
    default:
      return state;
  }
};

export const AppProvider = ({
  children
}) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAreas = async () => {
    try {
      const response = await getAreas();
      dispatch({
        type: 'SET_AREAS',
        payload: response.data
      });
    } catch (error) {
      console.error('Erro ao buscar áreas:', error);
    }
  };

  const fetchProcesses = async () => {
    try {
      const response = await getProcesses();
      dispatch({
        type: 'SET_PROCESSES',
        payload: response.data
      });
    } catch (error) {
      console.error('Erro ao buscar processos:', error);
    }
  };

  const showError = (message) => {
    dispatch({ type: 'SHOW_DIALOG', payload: { message, type: 'error' } });
  };

  const showMessage = (message) => {
    dispatch({ type: 'SHOW_DIALOG', payload: { message, type: 'success' } });
  };

  const hideDialog = () => {
    dispatch({ type: 'HIDE_DIALOG' });
  };

  const value = {
    state,
    fetchAreas,
    fetchProcesses,
    showError,
    showMessage,
    hideDialog
  };

  useEffect(() => {
    fetchAreas();
    fetchProcesses();
  }, []);

  return <AppContext.Provider value = {
    value
  } > {
    children
  } </AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);