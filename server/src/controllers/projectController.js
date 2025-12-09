const Project = require("../models/Project");

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).send("Error in fetching projects");
  }
};

// Add new project
const addProject = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    const newProject = new Project({ name, description, imageUrl });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).send("Error in adding project");
  }
};

// ❌ Delete project by ID
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Project not found");
    res.status(200).json({ message: "Project deleted", deletedProject: deleted });
  } catch (err) {
    res.status(500).send("Error deleting project");
  }
};

module.exports = { getProjects, addProject, deleteProject };
