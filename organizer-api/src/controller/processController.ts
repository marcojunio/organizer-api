import { NextFunction, Request, Response } from 'express';
import * as ProcessService from '../services/processService';
import { sendNotFoundResponse, sendSuccessResponse } from '../utils/responsesHandler';
import { processSchema } from '../types/zod';
import HttpStatusCode from '../utils/HttpStatusCode';

export const create = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const data = await ProcessService.createProcess(request.body);
        return sendSuccessResponse(response, data);
    } catch (error) {
        next(error);
    }
};

export const setChildrenProcess = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const data = await ProcessService.setChildrenProcess(request.body.data);
        return sendSuccessResponse(response, data);
    } catch (error) {
        next(error);
    }
};

export const getProcess = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const process = await ProcessService.getProcess(request.params.id);
        if (!process) {
            return sendNotFoundResponse(response, 'Process Not Found');
        }
        
        return sendSuccessResponse(response, process);
    } catch (error) {
        next(error);
    }
};

export const getTreeProcess = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const treeList = await ProcessService.getTreeProcess(request.params.id);
        
        return sendSuccessResponse(response, treeList);
    } catch (error) {
        next(error);
    }
};

export const listProcess = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const listProcess = await ProcessService.listProcess();
        return sendSuccessResponse(response, listProcess);
    } catch (error) {
        next(error);
    }
};

export const updateArea = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        processSchema.parse(request.body);

        const data = await ProcessService.updateProcess(request.body,request.params.id);
        
        return sendSuccessResponse(response, data);
    } catch (error) {
        next(error);
    }
};


export const deleteProcess = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        await ProcessService.deleteProcess(request.params.id)
        return sendSuccessResponse(response, HttpStatusCode.NO_CONTENT);
    } catch (error) {
        next(error);
    }
};

export const validateCreateProcess = (request: Request, _: Response, next: NextFunction): any => {
    try {
        const data = request.body;
        processSchema.parse(data);
        next();
    } catch (error) {
        next(error);
    }
};

export const checkExistingProcess = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const process = await ProcessService.getProcess(request.params.id);
        if (!process) {
            return sendNotFoundResponse(response, 'Process Not Found');
        }
        next();
    } catch (error) {
        next(error);
    }
};