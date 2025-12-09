// controllers/clientController.js
const Client = require("../models/Client");

const getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    return res.status(200).json(clients);
  } catch (err) {
    console.error("getClients error:", err);
    return res.status(500).json({ message: "Error in fetching clients" });
  }
};

const addClient = async (req, res) => {
  try {
    const { name, description, designation, imageUrl } = req.body;
    if (!name || !description || !designation || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newClient = new Client({ name, description, designation, imageUrl });
    await newClient.save();
    return res.status(201).json(newClient);
  } catch (err) {
    console.error("addClient error:", err);
    return res.status(500).json({ message: "Error in adding client" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is required" });

    const deleted = await Client.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }
    return res.status(200).json({ message: "Client deleted successfully", deletedClient: deleted });
  } catch (err) {
    console.error("deleteClient error:", err);
    return res.status(500).json({ message: "Error deleting client" });
  }
};

module.exports = { getClients, addClient, deleteClient };
