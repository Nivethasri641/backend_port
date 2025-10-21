const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

// Send a contact message
exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Save message to MongoDB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // Try sending email, but don’t fail if it errors
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: 'New Contact Form Message',
          text: `You got a new message from ${name} (${email}):\n\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
      } else {
        console.log('Email credentials not set. Skipping email.');
      }
    } catch (emailErr) {
      console.error('Failed to send email:', emailErr);
    }

    // Always return success if message saved
    res.status(200).json({ message: 'Message saved successfully!' });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Fetch all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
