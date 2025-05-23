import { Request, Response, NextFunction } from 'express';
import Message from '../models/Message';
import { AppError } from '../middleware/errorHandler';
import { sendEmail, sendNewMessageNotification } from '../utils/email';

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    // Send notification email
    try {
      await sendNewMessageNotification(newMessage);
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ success: false, message: 'Error creating message' });
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { searchTerm, isRead, startDate, endDate } = req.query;
    
    // Build query object
    const query: any = {};
    
    // Add search term if provided
    if (searchTerm) {
      query.$or = [
        { subject: { $regex: searchTerm, $options: 'i' } },
        { message: { $regex: searchTerm, $options: 'i' } },
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    
    // Add read status filter if provided
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }
    
    // Add date range filters if provided
    if (startDate) {
      query.createdAt = { ...query.createdAt, $gte: new Date(startDate as string) };
    }
    if (endDate) {
      query.createdAt = { ...query.createdAt, $lte: new Date(endDate as string) };
    }
    
    console.log('Query:', query); // Debug log
    
    const messages = await Message.find(query).sort({ createdAt: -1 });
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

export const getSentMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('Executing getSentMessages query...');
    const query = { reply: { $exists: true, $ne: null } };
    console.log('Sent messages query:', query);
    const messages = await Message.find(query)
      .sort({ repliedAt: -1 });
    console.log('Found', messages.length, 'sent messages.');
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching sent messages:', error);
    res.status(500).json({ message: 'Error fetching sent messages' });
  }
};

export const getMessageById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }
    res.json({ message });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ message: 'Error fetching message' });
  }
};

export const updateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { isRead } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead },
      { new: true }
    );
    if (!message) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }
    res.json({ message });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: 'Error updating message' });
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
};

export const sendReply = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('Received sendReply request body:', req.body);
    const { reply } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        reply,
        repliedAt: new Date(),
      },
      { new: true }
    );
    console.log('Updated message after sending reply:', message);

    if (!message) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }

    // Send email notification to the original sender
    if (message.email) {
      try {
        await sendEmail({
          to: message.email,
          subject: `Reply to your message: ${message.subject}`,
          text: `Your message has been replied to:\n\n${reply}`,
        });
        console.log('Reply email sent to', message.email);
      } catch (emailError) {
        console.error('Error sending reply email:', emailError);
        // Continue processing the request even if email fails
      }
    }

    res.json({ message });
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({ message: 'Error sending reply' });
  }
}; 