// LandingPage.jsx
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import ProjectCard from "../components/ProjectCard";
import ClientCard from "../components/ClientCard";
import ContactForm from "../components/ContactForm";
import NewsletterForm from "../components/NewsletterForm";
import "../Css/ClientCard.css";
import "../Css/LandingPage.css";
import logo from "../assets/logo.svg";
import homeLogo from "../assets/img_house.svg";
import dollarLogo from "../assets/img_dollar.svg";
import brushLogo from "../assets/img_brush.svg";
import img2 from "../assets/img2.svg";
import img3 from "../assets/img3.svg";
import img4 from "../assets/img4.svg";
import img5 from "../assets/img5.svg";
import img6 from "../assets/img6.svg";
import img7 from "../assets/img7.svg";

const LandingPage = () => {
  const [projects, setProjects] = useState([]); // default array prevents .map crash
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Debug: show axiosClient baseURL to avoid double /api issues
      try {
        console.log("API baseURL:", axiosClient?.defaults?.baseURL);
      } catch (e) {
        console.log("axiosClient baseURL not available:", e);
      }

      try {
        // Projects
        const projectsRes = await axiosClient.get("/api/projects");
        console.log("projectsRes.data:", projectsRes.data);

        // clients
        const clientsRes = await axiosClient.get("/api/clients");
        console.log("clientsRes.data:", clientsRes.data);

        // normalize a response that might be array or object with nested array
        const normalizeToArray = (data) => {
          if (!data) return [];
          if (Array.isArray(data)) return data;
          if (Array.isArray(data.projects)) return data.projects;
          if (Array.isArray(data.data)) return data.data;
          // find first array value in object
          const firstArray = Object.values(data).find((v) => Array.isArray(v));
          return firstArray || [];
        };

        setProjects(normalizeToArray(projectsRes.data));
        setClients(normalizeToArray(clientsRes.data));
      } catch (err) {
        console.error("Fetch error (LandingPage):", err);
        setError(err);
        setProjects([]); // ensure array
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading projects & clients...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        Failed to load data. Check console for details. If you see CORS errors,
        enable CORS on your backend or use a dev proxy.
      </div>
    );
  }

  return (
    <>
      <div className="Navbar">
        <img src={logo} alt="Logo" />
        <div className="Nav">
          <nav>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#project">About Projects</a>
            <a href="#client">Testimonials</a>
            <button>Contact</button>
          </nav>
        </div>
      </div>

      <section id="home">
        <div className="hero-section">
          <div className="hero-content">Consultation, Design & Marketing</div>
          <div style={{ position: "absolute", right: "5rem", top: "4rem" }}>
            <ContactForm />
          </div>
        </div>
      </section>

      <section id="services">
        <div className="content">
          <div className="content1">
            <h2>Not Your Average Realtor</h2>
            <p>
              Real Trust is a one-stop shop for real estate projects, personal
              brand marketing, design, and advertising marketing to get the home
              value you got & the client it attracts.
            </p>
          </div>
          <div className="content2">
            {/* corrected attribute name srcSet */}
            <img src={img2} alt="" srcSet="" />
            <img src={img3} alt="" srcSet="" />
            <img src={img4} alt="" srcSet="" />
          </div>
        </div>
      </section>

      <section>
        <h2>Why Choose Us?</h2>
        <div className="why-choose-grid">
          <div>
            <img src={homeLogo} alt="" />
            <h4>Potential ROI</h4>
            <p>
              Get design, pricing, and marketing strategies that maximize your
              home value.
            </p>
          </div>
          <div>
            <img src={brushLogo} alt="" />
            <h4>Design</h4>
            <p>
              Our design service enhances project appeal and attracts buyers
              effectively.
            </p>
          </div>
          <div>
            <img src={dollarLogo} alt="" />
            <h4>Marketing</h4>
            <p>
              Get powerful marketing strategies and brand presence in every home
              sale.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>About Us</h2>
        <div className="about-section">
          <div>
            <h4>Welcome to Our Company</h4>
            <p>
              We are a passionate team of developers, designers, and innovators
              committed to delivering top-notch web solutions. Since our
              inception, we’ve been focused on building intuitive, scalable, and
              high-performance applications that help our clients grow and
              succeed in the digital landscape. Our journey started with a
              simple idea — to create impactful software that solves real-world
              problems. Today, we take pride in having worked with clients from
              various industries, delivering customized solutions that exceed
              expectations. Whether it’s a startup seeking a digital identity or
              an enterprise aiming for technological transformation, we bring
              creativity, precision, and dedication to every project we
              undertake.
            </p>
          </div>
        </div>
      </section>

      <section id="project" className="projects-section">
        <h2>Our Projects</h2>
        <p>
          We know what buyers are looking for and suggest projects that will
          bring clients top dollar for the sale of their homes.
        </p>

        <div className="project-scroll-container">
          <div className="project-grid">
            {projects.length === 0 ? (
              <p>No projects found.</p>
            ) : (
              projects.map((project, idx) => (
                <ProjectCard key={project._id || idx} project={project} />
              ))
            )}
          </div>
        </div>
      </section>

      <section id="client" className="client-section">
        <h2>Happy Clients</h2>
        <div className="scroll-wrapper">
          <div className="client-grid">
            {clients.length === 0 ? (
              <p>No clients found.</p>
            ) : (
              clients.map((client, idx) => (
                <ClientCard key={client._id || idx} client={client} />
              ))
            )}
          </div>
        </div>
      </section>

      <section id="subscribe" className="newsletter-section">
        {/* corrected attribute name srcSet */}
        <img src={logo} alt="" srcSet="" />
        <h2>Subscribe to Our Newsletter</h2>
        <NewsletterForm />
      </section>
    </>
  );
};

export default LandingPage;
