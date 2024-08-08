import express from 'express';
import { getUsersExcludingCurrent } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsersExcludingCurrent);

export default router;
