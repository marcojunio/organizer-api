import * as AreaController from '../controller/areaController';
import express from 'express';

const router = express.Router();

// Acess : public
// POST : create
// Params body : name
router.post('/create', AreaController.validateCreateArea, AreaController.create);

// Acess : Public
// GET : All areas
router.get('/get-all', AreaController.listAllAreas);

// Acess : Public
// GET : Get One Area by ID
// Params query : id
router.get('/get/:id', AreaController.getArea);

// Acess : Public
// GET : Delete Area by ID
// Params query : id
router.delete('/delete/:id', AreaController.checkExistingArea, AreaController.deleteArea);

// Acess : Public
// GET : Update Area by ID
// Params query : id / body : name
router.put('/update/:id', AreaController.checkExistingArea, AreaController.updateArea);



export default router;