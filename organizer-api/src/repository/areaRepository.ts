import { TAreaID, TAreaRead, TAreaWrite } from '../types/general';
import { db } from '../utils/db.server';

export const listAreas = async (): Promise<TAreaRead[]> => {
    return db.area.findMany({
        select: {
            id: true,
            name: true,
        },
    });
};

export const getArea = async (id: TAreaID): Promise<TAreaRead | null> => {
    return db.area.findUnique({
        where: {
            id: id,
        },
        include:{
            processes:{
                select:{
                    id:true,
                    name:true,
                    responsible:true,
                    initDate:true,
                    typeProcess:true
                },
            },
        }
    });
};

export const createArea = async (area: TAreaWrite): Promise<TAreaRead> => {
    const { name } = area;

    return db.area.create({
        data: {
            name,
        },
        select: {
            id: true,
            name: true,
        },
    });
};

export const updateArea = async (area: TAreaWrite, id: TAreaID): Promise<TAreaRead> => {
    const { name } = area;

    return db.area.update({
        where: {
            id: id,
        },
        data: {
            name,
        },
        select: {
            id: true,
            name: true,
        },
    });
};

export const deleteArea = async (id: TAreaID): Promise<void> => {
    await db.area.delete({
        where: {
            id: id,
        },
    });
};