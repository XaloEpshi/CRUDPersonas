import { Router } from 'express';
import {
    showAddForm,
    addPersona,
    listPersonas,
    showEditForm,
    editPersona,
    deletePersona
} from '../controllers/personas.controller.js';

const router = Router();

router.get('/add', showAddForm);
router.post('/add', addPersona);
router.get('/list', listPersonas);
router.get('/edit/:id', showEditForm);
router.post('/edit/:id', editPersona);
router.get('/delete/:id', deletePersona);

export default router;
