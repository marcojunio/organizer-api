import * as ProcessRepository from '../repository/processRepository';
import { TAreaID, TProcessGetAll, TProcessID, TProcessRead, TProcessWrite } from '../types/general';
import { setSubprocessSchema } from '../types/zod';

export const listProcess = async (): Promise<TProcessGetAll[]> => {
    return await ProcessRepository.listProcess();
};

export const getProcess = async (id: TProcessID): Promise<TProcessRead | null> => {
    return await ProcessRepository.getProcess(id);
};

export const createProcess = async (process: TProcessWrite): Promise<TProcessRead> => {
    return await ProcessRepository.createProcess(process);
};

export const updateProcess = async (process: TProcessWrite, id: TProcessID): Promise<TProcessRead> => {
    return await ProcessRepository.updateProcess(process, id);
};

export const deleteProcess = async (id: TProcessID): Promise<void> => {
    return await ProcessRepository.deleteProcess(id);
};

export const getTreeProcess = async (areaId: TAreaID): Promise<void> => {
    return await ProcessRepository.getTreeProcess(areaId);
}

export const setChildrenProcess = async (data: { idParent: TProcessID, childrenIds: Array<TProcessID> }): Promise<void> => {
    setSubprocessSchema.parse(data);
    
    return await ProcessRepository.setChildrenProcess(data);
}
