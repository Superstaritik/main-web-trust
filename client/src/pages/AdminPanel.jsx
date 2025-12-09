// src/pages/AdminPanel.jsx
import { useEffect, useState } from 'react';
import axiosClient, { setAuthToken } from '../api/axiosClient';
import '../Css/AdminPanel.css';

const AdminPanel = () => {
  const [project, setProject] = useState({ name: '', description: '', imageUrl: '' });
  const [client, setClient] = useState({ name: '', description: '', designation: '', imageUrl: '' });
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalize = (d) => {
    if (!d) return [];
    if (Array.isArray(d)) return d;
    if (Array.isArray(d.projects)) return d.projects;
    if (Array.isArray(d.data)) return d.data;
    const firstArray = Object.values(d).find((v) => Array.isArray(v));
    return firstArray || [];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [contactRes, newsletterRes, projectRes, clientRes] = await Promise.all([
          axiosClient.get('/api/contacts'),
          axiosClient.get('/api/newsletter'),
          axiosClient.get('/api/projects'),
          axiosClient.get('/api/clients'),
        ]);

        console.log('contactRes.data ->', contactRes.data);
        console.log('newsletterRes.data ->', newsletterRes.data);
        console.log('projectRes.data ->', projectRes.data);
        console.log('clientRes.data ->', clientRes.data);

        setContacts(normalize(contactRes.data));
        setSubscribers(normalize(newsletterRes.data));
        setProjects(normalize(projectRes.data));
        setClients(normalize(clientRes.data));
      } catch (err) {
        console.error('fetchData error:', err);
        setError(err);
        setContacts([]);
        setSubscribers([]);
        setProjects([]);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // helper to get token (if you prefer per-request header)
  const getToken = () => localStorage.getItem('token');

  // Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axiosClient.post('/api/projects', project, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        withCredentials: true,
      });
      alert('Project added!');
      setProject({ name: '', description: '', imageUrl: '' });
      const updatedProjects = await axiosClient.get('/api/projects');
      setProjects(normalize(updatedProjects.data));
    } catch (err) {
      console.error('Add project error:', err);
      alert('Error adding project (see console)');
    }
  };

  // Delete Project
const handleDeleteProject = async (id) => {
  if (!window.confirm("Are you sure you want to delete this project?")) return;
  try {
    const token = localStorage.getItem('token');
    console.log('Frontend will send token:', token);

    const res = await axiosClient.delete(`/api/projects/${id}`, {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
      withCredentials: true
    });

    console.log('Delete response data:', res.data);
    setProjects((prev) => prev.filter((p) => p._id !== id));
    alert('Project deleted!');
  } catch (err) {
    console.error('Delete project error:', err);
    alert('Error deleting project - see console');
  }
};

  // Add Client
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axiosClient.post('/api/clients', client, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        withCredentials: true,
      });
      alert('Client added!');
      setClient({ name: '', description: '', designation: '', imageUrl: '' });
      const updatedClients = await axiosClient.get('/api/clients');
      setClients(normalize(updatedClients.data));
    } catch (err) {
      console.error('Add client error:', err);
      alert('Error adding client (see console)');
    }
  };

  // Delete Client
  const handleDeleteClient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      const token = getToken();
      await axiosClient.delete(`/api/clients/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        withCredentials: true,
      });
      setClients((prev) => prev.filter((c) => c._id !== id));
      alert("Client deleted!");
    } catch (err) {
      console.error('Delete client error:', err);
      alert("Error deleting client (see console)");
    }
  };

  // Delete Contact
  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      const token = getToken();
      await axiosClient.delete(`/api/contacts/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        withCredentials: true,
      });
      setContacts((prev) => prev.filter((c) => c._id !== id));
      alert("Contact deleted!");
    } catch (err) {
      console.error('Delete contact error:', err);
      alert("Error deleting contact (see console)");
    }
  };

  // Delete Subscriber
  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      const token = getToken();
      await axiosClient.delete(`/api/newsletter/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        withCredentials: true,
      });
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      alert("Subscriber deleted!");
    } catch (err) {
      console.error('Delete subscriber error:', err);
      alert("Error deleting subscriber (see console)");
    }
  };

  if (loading) return <div style={{ padding: 16 }}>Loading admin data...</div>;
  if (error) return <div style={{ padding: 16 }}>Error loading data. Check console (network / CORS / API response shape).</div>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Add Project */}
      <section>
        <h2>Add Project</h2>
        <form onSubmit={handleAddProject}>
          <input placeholder="Name" value={project.name} onChange={(e) => setProject({ ...project, name: e.target.value })} />
          <input placeholder="Image URL" value={project.imageUrl} onChange={(e) => setProject({ ...project, imageUrl: e.target.value })} />
          <textarea placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} />
          <button type="submit">Add Project</button>
        </form>
      </section>

      {/* List Projects */}
      <section>
        <h2>All Projects</h2>
        <ul>
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((p) => (
              <li key={p._id || p.id || Math.random()}>
                <img src={p.imageUrl} alt={p.name} width="80" />
                <strong>{p.name}</strong> - {p.description}
                <br />
                <button onClick={() => handleDeleteProject(p._id)} style={{ color: 'white' }}>Delete</button>
              </li>
            ))
          ) : (
            <li>No projects found.</li>
          )}
        </ul>
      </section>

      {/* Add Client */}
      <section>
        <h2>Add Client</h2>
        <form onSubmit={handleAddClient}>
          <input placeholder="Name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
          <input placeholder="Image URL" value={client.imageUrl} onChange={(e) => setClient({ ...client, imageUrl: e.target.value })} />
          <input placeholder="Designation" value={client.designation} onChange={(e) => setClient({ ...client, designation: e.target.value })} />
          <textarea placeholder="Description" value={client.description} onChange={(e) => setClient({ ...client, description: e.target.value })} />
          <button type="submit">Add Client</button>
        </form>
      </section>

      {/* List Clients */}
      <section>
        <h2>All Clients</h2>
        <ul>
          {Array.isArray(clients) && clients.length > 0 ? (
            clients.map((c) => (
              <li key={c._id || c.id || Math.random()}>
                <img src={c.imageUrl} alt={c.name} width="80" />
                <strong>{c.name}</strong> - {c.designation} <br />
                {c.description}
                <br />
                <button onClick={() => handleDeleteClient(c._id)} style={{ color: 'white' }}>Delete</button>
              </li>
            ))
          ) : (
            <li>No clients found.</li>
          )}
        </ul>
      </section>

      {/* Contact Submissions */}
      <section>
        <h2>Contact Submissions</h2>
        <ul>
          {Array.isArray(contacts) && contacts.length > 0 ? (
            contacts.map((c) => (
              <li key={c._id || c.id || Math.random()}>
                {c.fullName} | {c.email} | {c.mobile} | {c.city}
                <br />
                <button onClick={() => handleDeleteContact(c._id)} style={{ color: 'white' }}>Delete</button>
              </li>
            ))
          ) : (
            <li>No contacts found.</li>
          )}
        </ul>
      </section>

      {/* Newsletter Subscribers */}
      <section>
        <h2>Newsletter Subscribers</h2>
        <ul>
          {Array.isArray(subscribers) && subscribers.length > 0 ? (
            subscribers.map((s) => (
              <li key={s._id || s.id || Math.random()}>
                {s.email}
                <br />
                <button onClick={() => handleDeleteSubscriber(s._id)} style={{ color: 'white' }}>Delete</button>
              </li>
            ))
          ) : (
            <li>No subscribers found.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
