import api from './api';

export const createProcess = async (processData) => {
  const response = await api.post('/api/process/create', processData);
  return response.data;
};

export const getProcesses = async () => {
  const response = await api.get('/api/process/get-all');
  return response.data;
};

export const getProcessesById = async (id) => {
  const response = await api.get(`/api/process/get/${id}`);
  return response.data;
};

export const getTreeProcess = async (id) => {
  const response = await api.get(`/api/process/get-tree/${id}`);
  return response.data;
};

export const createParent = async (data) => {
  const response = await api.post(`/api/process//set-parent`,data);
  return response.data;
};

export const updateProcess = async (processId, updateData) => {
  const response = await api.put(`/api/process/update/${processId}`, updateData);
  return response.data;
};

export const deleteProcess = async (processId) => {
  await api.delete(`/api/process/delete/${processId}`);
};