"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReply = exports.deleteMessage = exports.updateMessage = exports.getMessageById = exports.getSentMessages = exports.getMessages = exports.createMessage = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const email_1 = require("../utils/email");
const createMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = await Message_1.default.create({
            name,
            email,
            subject,
            message
        });
        // Send notification email
        try {
            await (0, email_1.sendNewMessageNotification)(newMessage);
        }
        catch (emailError) {
            console.error('Error sending notification email:', emailError);
            // Don't fail the request if email fails
        }
        res.status(201).json({ success: true, message: newMessage });
    }
    catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ success: false, message: 'Error creating message' });
    }
};
exports.createMessage = createMessage;
const getMessages = async (req, res, next) => {
    try {
        const messages = await Message_1.default.find().sort({ createdAt: -1 });
        res.json({ messages });
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
};
exports.getMessages = getMessages;
const getSentMessages = async (req, res, next) => {
    try {
        const messages = await Message_1.default.find({ reply: { $exists: true, $ne: null } })
            .sort({ repliedAt: -1 });
        res.json({ messages });
    }
    catch (error) {
        console.error('Error fetching sent messages:', error);
        res.status(500).json({ message: 'Error fetching sent messages' });
    }
};
exports.getSentMessages = getSentMessages;
const getMessageById = async (req, res, next) => {
    try {
        const message = await Message_1.default.findById(req.params.id);
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        res.json({ message });
    }
    catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ message: 'Error fetching message' });
    }
};
exports.getMessageById = getMessageById;
const updateMessage = async (req, res, next) => {
    try {
        const { isRead } = req.body;
        const message = await Message_1.default.findByIdAndUpdate(req.params.id, { isRead }, { new: true });
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        res.json({ message });
    }
    catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ message: 'Error updating message' });
    }
};
exports.updateMessage = updateMessage;
const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message_1.default.findByIdAndDelete(req.params.id);
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        res.json({ message: 'Message deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: 'Error deleting message' });
    }
};
exports.deleteMessage = deleteMessage;
const sendReply = async (req, res, next) => {
    try {
        const { reply } = req.body;
        const message = await Message_1.default.findByIdAndUpdate(req.params.id, {
            reply,
            repliedAt: new Date(),
        }, { new: true });
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        res.json({ message });
    }
    catch (error) {
        console.error('Error sending reply:', error);
        res.status(500).json({ message: 'Error sending reply' });
    }
};
exports.sendReply = sendReply;
