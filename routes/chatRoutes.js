import express from 'express';
import { createGroup, getChatsForUser } from '../controllers/chatController.js';

const router = express.Router();

router.post('/groups', createGroup);
router.get('/groups/:userId', getChatsForUser);

export default router;
