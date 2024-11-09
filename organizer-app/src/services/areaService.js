import api from './api';

export const createArea = async (areaData) => {
  const response = await api.post('/areas', areaData);
  return response.data;
};

export const getAreas = async () => {
  const response = await api.get('/areas');
  return response.data;
};