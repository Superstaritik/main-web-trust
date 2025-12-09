import '../Css/ClientCard.css';
const ClientCard = ({ client }) => (
  <div className="client-card">
    <img src={client.imageUrl} alt={client.name} />
    <p>{client.description}</p>
    <h4>{client.name}</h4>
    <span>{client.designation}</span>
  </div>
);

export default ClientCard;
