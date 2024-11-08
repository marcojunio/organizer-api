import { z } from 'zod';

//Author Schema
export const areaSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }).min(1, { message: 'Area name must be at least 1 characters long' }).max(30, {
        message: 'Area name cannot be longer than 30 characters',
    })
});

//Book Schema
export const processSchema = z.object({
    name: z.string(
        { required_error: 'Process name is required' }
    ).min(1, { message: 'Process name must be at least 1 characters long' }).max(30, {
        message: 'Process name cannot be longer than 30 characters',
    }),

    initDate: z.string({
        required_error: 'Date is required'
    }).datetime(),

    tools: z.string(
        { required_error: 'Tools is required' }
    ).min(1, { message: 'Tools is  must be at least 1 characters long' }),

    responsible: z.string(
        { required_error: 'Responsible is required' }
    ).min(1, { message: 'Responsible  must be at least 1 characters long' }),

    documentation: z.string(
        { required_error: 'Documentation is required' }
    ).min(1, { message: 'Documentation  must be at least 1 characters long' }),

    typeProcess: z.enum(['Manual', 'Automatic'], {
        required_error: 'Type process is required'
    }),

    areaId: z.string(
        { required_error: 'Area is required' }
    ),
});

export const setSubprocessSchema = z.object({
    idParent: z.string({
        required_error: "Parent process is required"
    }).min(1,{message:"Parent process is required"}),

    childrenIds: z.array(z.string()).nonempty("Children process is required")
}).refine((data) => !data.childrenIds.includes(data.idParent), {
    message: "The parent process cannot be in the list of children",
    path: ["childrenIds"],
});

//Export Types
export type TAreaSchema = z.infer<typeof areaSchema>;
export type TProcessSchema = z.infer<typeof processSchema>;