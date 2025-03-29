import { Request, Response } from 'express';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

// Send contact message (public route)
export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    // Save contact message to database
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    
    await newContact.save();
    
    // Send email notification if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Create transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
      // Send email
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        subject: `New contact message from ${req.body.name}`,
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
        html: `<p><strong>Name:</strong> ${req.body.name}</p>
               <p><strong>Email:</strong> ${req.body.email}</p>
               <p><strong>Message:</strong> ${req.body.message}</p>`,
      });
    }
    
    res.status(201).json({ 
      message: 'Contact message sent successfully',
      contact: newContact
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all contact messages (admin only)
export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a contact message (admin only)
export const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const deletedMessage = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 