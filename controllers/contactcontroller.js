import Contact from "./models/Contact.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to DB
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};
