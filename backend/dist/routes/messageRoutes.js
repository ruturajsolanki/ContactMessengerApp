"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
// Create a new message (no auth required)
router.post('/', messageController_1.createMessage);
// Get sent messages (messages with replies)
router.get('/sent', auth_1.authenticateToken, messageController_1.getSentMessages);
// Get all messages
router.get('/', auth_1.authenticateToken, messageController_1.getMessages);
// Get a single message
router.get('/:id', auth_1.authenticateToken, messageController_1.getMessageById);
// Update a message
router.put('/:id', auth_1.authenticateToken, messageController_1.updateMessage);
// Delete a message
router.delete('/:id', auth_1.authenticateToken, messageController_1.deleteMessage);
// Send a reply
router.post('/:id/reply', auth_1.authenticateToken, messageController_1.sendReply);
exports.default = router;
