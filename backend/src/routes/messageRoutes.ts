import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  sendReply,
  getSentMessages,
} from '../controllers/messageController';

const router = express.Router();

// Public route for creating messages
router.post('/', createMessage);

// Protected routes
router.use(authenticateToken);
router.get('/', getMessages);
router.get('/sent', getSentMessages);
router.get('/:id', getMessageById);
router.patch('/:id', updateMessage);
router.delete('/:id', deleteMessage);
router.post('/:id/reply', sendReply);

export default router; 