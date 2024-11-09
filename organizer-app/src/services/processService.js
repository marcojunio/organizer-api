import api from "./api";

export const createProcess = async (processData) => {
    const response = await api.post('/processes', processData);
    return response.data;
};

export const getProcesses = async () => {
    const response = await api.get('/processes');
    return response.data;
};

export const updateProcess = async (processId, updateData) => {
    const response = await api.put(`/processes/${processId}`, updateData);
    return response.data;
};

export const deleteProcess = async (processId) => {
    await api.delete(`/processes/${processId}`);
};