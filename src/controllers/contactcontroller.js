const Contact = require('../models/contact');
const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save message to DB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // Setup Nodemailer transport
    let transporter = nodemailer.createTransport({
      service: "gmail", // or "outlook", "yahoo", or custom SMTP
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    // Email options
    let mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: "your-email@example.com", // replace with your mail id
      subject: "New Contact Form Message",
      text: `You got a new message from ${name} (${email}):\n\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent & email delivered!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
