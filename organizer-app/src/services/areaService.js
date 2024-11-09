import api from './api';

export const createArea = async (areaData) => {
    const response = await api.post('/api/area/create', areaData);
    return response.data;
};


export const updateArea = async (id,areaData) => {
    const response = await api.put(`/api/area/update/${id}`, areaData);
    return response.data;
};

export const deleteArea = async (id) => {
    const response = await api.delete(`/api/area/delete/${id}`);
    return response.data;
};

export const getAreas = async () => {
    const response = await api.get('/api/area/get-all');
    return response.data;
};