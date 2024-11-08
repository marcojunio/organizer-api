import * as ProcessController from '../controller/processController';
import express from 'express';

const router = express.Router();

// Acess : public
// POST : create
// Params body : name, tools , responsible, typeProcess, documentation, initDate, areaId
router.post('/create', ProcessController.validateCreateProcess, ProcessController.create);

// Acess : public
// POST : create
// Params body : data:{ idParent:string, childrenIds:Array<string> }
router.post('/set-parent', ProcessController.setChildrenProcess);

// Acess : Public
// GET : All process
router.get('/get-all', ProcessController.listProcess);

// Acess : Public
// GET : All areas
router.get('/get-tree/:idArea', ProcessController.getTreeProcess);

// Acess : Public
// GET : Get One Process by ID
// Params query : id
router.get('/get/:id', ProcessController.getProcess);

// Acess : Public
// GET : Delete Process by ID
// Params query : id
router.delete('/delete/:id', ProcessController.checkExistingProcess, ProcessController.deleteProcess);

// Acess : Public
// GET : Update Area by ID
// Params query : id / body : name
router.put('/update/:id', ProcessController.checkExistingProcess, ProcessController.updateArea);

export default router;