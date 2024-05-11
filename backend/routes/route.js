import express from 'express';
import {create} from '../controllers/create.js';
import {read} from '../controllers/read.js';
import {update} from '../controllers/update.js';
import {remove} from '../controllers/delete.js';

const router = express.Router();

router.post('/add', create);
router.get('/read', read);
router.put('/update', update);
router.delete('/remove/:email', remove);

export default router;
