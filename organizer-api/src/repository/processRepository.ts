import { TAreaID, TProcessGetAll, TProcessID, TProcessRead, TProcessWrite } from '../types/general';
import { db } from '../utils/db.server';

export const listProcess = async (): Promise<TProcessGetAll[]> => {
    return db.process.findMany({
        select: {
            id: true,
            name: true,
            responsible: true,
            tools: true,
            typeProcess: true,
            areaId: true,
            documentation: true,
            initDate: true
        },
    });
};

export const getProcess = async (id: TProcessID): Promise<TProcessRead | null> => {
    return db.process.findUnique({
        where: {
            id: id,
        },
    });
};

export const createProcess = async (process: TProcessWrite): Promise<TProcessRead> => {
    return db.process.create({
        data: process,
        select: {
            id: true,
            name: true,
            documentation: true,
            initDate: true,
            tools: true,
            responsible: true,
            typeProcess: true
        },
    });
};

export const updateProcess = async (process: TProcessWrite, id: TProcessID): Promise<TProcessRead> => {
    const { typeProcess, documentation, initDate, name, responsible, tools, areaId, parentId } = process;

    return db.process.update({
        where: {
            id: id,
        },
        data: {
            name,
            typeProcess,
            documentation,
            initDate,
            responsible,
            tools,
            areaId,
            parentId
        },
        select: {
            id: true,
            name: true,
            documentation: true,
            initDate: true,
            tools: true,
            responsible: true,
            typeProcess: true
        },
    });
};

export const deleteProcess = async (id: TProcessID): Promise<void> => {
    await db.process.delete({
        where: {
            id: id,
        },
    });
};


export const getTreeProcess = async (id: TAreaID): Promise<any> => {

    let includeObject: any = {
        include: {
            children: {
                select: {
                    id: true,
                    name: true,
                    documentation: true,
                    initDate: true,
                    tools: true,
                    responsible: true,
                    typeProcess: true,
                    children: true
                }
            },
        }
    }

    let pointer = includeObject.include;

    for (let i = 0; i < 50; i++) {

        pointer.children = {
            include: {
                children: {
                    select: {
                        id: true,
                        name: true,
                        documentation: true,
                        initDate: true,
                        tools: true,
                        responsible: true,
                        typeProcess: true,
                        children: true
                    }
                },
            }
        }
        pointer = pointer.children.include;
    }

    return await db.process.findMany({
        where: {
            areaId: id,
            parentId: {
                equals: null
            }
        },
        include: includeObject.include
    });
};

export const setChildrenProcess = async (data: { idParent: TProcessID, childrenIds: Array<TProcessID> }): Promise<any> => {
    return await db.process.updateMany({
        data: {
            parentId: data.idParent
        },
        where: {
            id: {
                in: data.childrenIds
            }
        }
    });
};