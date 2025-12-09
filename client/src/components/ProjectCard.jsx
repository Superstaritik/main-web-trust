import '../Css/ProjectCard.css';

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <img src={project.imageUrl} alt={project.name} />
    <h3>{project.name}</h3>
    <p>{project.description}</p>
    <button>READ MORE</button>
  </div>
);

export default ProjectCard;
