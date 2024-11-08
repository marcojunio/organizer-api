import { Area, Process } from '@prisma/client';

//Area Types
export type TAreaID = Area['id'];
export type TAreaRead = Omit<Area, 'createdAt' | 'updatedAt'>;
export type TAreaWrite = Omit<Area, 'id' | 'createdAt' | 'updatedAt'>;

//Process Types
export type TProcessID = Process['id'];
export type TProcessWrite = Omit<Process, 'id' | 'createdAt' | 'updatedAt'>;
export type TProcessRead = Omit<Process, 'createdAt' | 'updatedAt' | 'areaId' | 'parentId'>;
export type TProcessGetAll = Omit<Process, 'createdAt' | 'updatedAt' | 'areaId' | 'parentId' |
    'documentation' |
    'initDate' |
    'tools' |
    'responsible' |
    'typeProcess'>