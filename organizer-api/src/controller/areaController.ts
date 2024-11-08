import { NextFunction, Request, Response } from "express";
import { sendNotFoundResponse, sendSuccessResponse } from "../utils/responsesHandler";
import { areaSchema } from "../types/zod";
import * as AreaService from '../services/areaService';
import HttpStatusCode from "../utils/HttpStatusCode";

export const create = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const data = await AreaService.createArea(request.body);
        return sendSuccessResponse(response, data);
    } catch (error) {
        next(error);
    }
};

export const getArea = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const area = await AreaService.getArea(request.params.id);
        if (!area) {
            return sendNotFoundResponse(response, 'Area Not Found');
        }

        return sendSuccessResponse(response, area);
    } catch (error) {
        next(error);
    }
};

export const deleteArea = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        await AreaService.deleteArea(request.params.id)
        return sendSuccessResponse(response, HttpStatusCode.NO_CONTENT);
    } catch (error) {
        next(error);
    }
};


export const updateArea = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        areaSchema.parse(request.body);

        const data = await AreaService.updateArea(request.body,request.params.id);
        
        return sendSuccessResponse(response, data);
    } catch (error) {
        next(error);
    }
};


export const listAllAreas = async (_: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const data = await AreaService.listAreas();
        return sendSuccessResponse(response, data);
    } catch (error) {
        next(error);
    }
};

export const checkExistingArea = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {
        const area = await AreaService.getArea(request.params.id);
        if (!area) {
            return sendNotFoundResponse(response, 'Area Not Found');
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const validateCreateArea = (request: Request, response: Response, next: NextFunction): any => {
    try {
        const data = request.body;
        areaSchema.parse(data);
        next();
    } catch (error) {
        next(error);
    }
};