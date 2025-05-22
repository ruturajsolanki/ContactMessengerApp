"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    },
    reply: {
        type: String,
    },
    repliedAt: {
        type: Date,
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: 'contactmessages'
});
// Indexes for better query performance
messageSchema.index({ createdAt: -1 });
messageSchema.index({ isRead: 1 });
messageSchema.index({ email: 1 });
messageSchema.index({ name: 'text', email: 'text', subject: 'text', message: 'text' });
exports.default = mongoose_1.default.model('Message', messageSchema);
