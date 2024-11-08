import * as AreaRepository from '../repository/areaRepository';
import { TAreaID, TAreaRead, TAreaWrite } from '../types/general';

export const listAreas = async (): Promise<TAreaRead[]> => {
    return await AreaRepository.listAreas();
};

export const getArea = async (id: TAreaID): Promise<TAreaRead | null> => {
    return await AreaRepository.getArea(id);
};

export const createArea = async (area: TAreaWrite): Promise<TAreaRead> => {
    return await AreaRepository.createArea(area);
};

export const updateArea = async (area: TAreaWrite, id: TAreaID): Promise<TAreaRead> => {
    return await AreaRepository.updateArea(area, id);
};

export const deleteArea = async (id: TAreaID): Promise<void> => {
    await AreaRepository.deleteArea(id);
};