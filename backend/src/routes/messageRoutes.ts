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

// Create a new message (no auth required)
router.post('/', createMessage);

// Get sent messages (messages with replies)
router.get('/sent', authenticateToken, getSentMessages);

// Get all messages
router.get('/', authenticateToken, getMessages);

// Get a single message
router.get('/:id', authenticateToken, getMessageById);

// Update a message
router.put('/:id', authenticateToken, updateMessage);

// Delete a message
router.delete('/:id', authenticateToken, deleteMessage);

// Send a reply
router.post('/:id/reply', authenticateToken, sendReply);

export default router; 