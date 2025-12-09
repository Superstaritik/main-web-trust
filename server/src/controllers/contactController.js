const Contact = require("../models/Contact");
const validate = require('../utils/validate');

// Get all contacts
const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).send("Error in fetching contacts");
  }
};

// Add new contact
const addContact = async (req, res) => {
  try {
    validate(req.body);
    const { fullName, email, mobile, city } = req.body;
    const newContact = new Contact({ fullName, email, mobile, city });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).send("Error in adding contact: " + err);
  }
};

// ❌ Delete contact by ID
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Contact not found");
    res.status(200).json({ message: "Contact deleted", deleted });
  } catch (err) {
    res.status(500).send("Error deleting contact");
  }
};

module.exports = { getContact, addContact, deleteContact };
