const Subscriber = require('../models/Subscriber');
const validate = require('../utils/validate');

// Get all subscribers
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).send("Error in fetching subscribers");
  }
};

// Add new subscriber
const addSubscriber = async (req, res) => {
  try {
    validate(req.body);
    console.log(req.body);
    const { email } = req.body;
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).send("Error in adding subscriber: " + err);
  }
};

// ❌ Delete subscriber by ID
const deleteSubscriber = async (req, res) => {
  try {
    const deleted = await Subscriber.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Subscriber not found");
    res.status(200).json({ message: "Subscriber deleted", deleted });
  } catch (err) {
    res.status(500).send("Error deleting subscriber");
  }
};

module.exports = { getSubscribers, addSubscriber, deleteSubscriber };
