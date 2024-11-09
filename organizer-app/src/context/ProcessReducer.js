export const processReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_AREA':
        return { ...state, areas: [...state.areas, action.payload] };
      case 'ADD_PROCESS':
        return { ...state, processes: [...state.processes, action.payload] };
      case 'UPDATE_PROCESS':
        return {
          ...state,
          processes: state.processes.map((p) =>
            p.id === action.payload.id ? action.payload : p
          ),
        };
      case 'DELETE_PROCESS':
        return {
          ...state,
          processes: state.processes.filter((p) => p.id !== action.payload.id),
        };
      default:
        return state;
    }
  };