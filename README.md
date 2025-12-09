🚀 Full Stack Landing Page with Admin Panel

This project is a responsive full-stack web application built using React, Node.js, Express, and MongoDB, featuring an elegant landing page, admin panel, and image uploads using Cloudinary.
📌 Features
✅ Landing Page (Frontend)

    Dynamic Project and Client cards

    Horizontal scroll sections for better UX

    Newsletter subscription with email validation

    Contact form with Zod + React Hook Form validation

    Styled with responsive, modern CSS and animations

✅ Admin Panel (Frontend)

    Add/delete Projects and Clients

    View all Contact submissions and Newsletter subscribers

    Uses Axios to interact with backend API

    Protected and efficient CRUD operations

✅ Backend (Node.js + Express)

    RESTful APIs for:

        /api/projects

        /api/clients

        /api/contacts

        /api/newsletter

    Image upload via Cloudinary

    MongoDB + Mongoose models

    Error handling and schema validation

📦 Tech Stack
Frontend	Backend	Other Tools
React	Node.js	MongoDB
React Hook Form	Express.js	Mongoose
Zod	Axios	Cloudinary
CSS Flex/Grid Layout	Nodemon	dotenv
🔧 Installation & Setup
1. Clone the Repository

git clone https://github.com/your-username/project-landing-admin.git
cd project-landing-admin

2. Setup Backend

cd server
npm install

➕ Create .env file inside /server

PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

npm run dev

3. Setup Frontend

cd client
npm install
npm run dev

🌐 API Endpoints
Method	Route	Description
GET	/api/projects	Fetch all projects
POST	/api/projects	Add new project
DELETE	/api/projects/:id	Delete a project
GET	/api/clients	Fetch all clients
POST	/api/clients	Add new client
DELETE	/api/clients/:id	Delete a client
POST	/api/contacts	Submit contact form
GET	/api/contacts	Get all contact entries
POST	/api/newsletter	Add subscriber
GET	/api/newsletter	Get all subscribers
📸 Cloudinary Integration

Images uploaded via the Admin Panel are automatically stored on Cloudinary, and their URLs are saved in MongoDB for efficient retrieval and use on the frontend.
📂 Folder Structure

project-root/
├── client/          → React Frontend
├── server/          → Express + MongoDB Backend
├── models/          → Mongoose schemas
├── routes/          → Express routers
├── controllers/     → Backend business logic
├── utils/           → Cloudinary config, validation

🧪 Validation

    Frontend: Zod + React Hook Form

    Backend: Basic try-catch & Mongo validation

🙌 Acknowledgements

    Cloudinary

    React Hook Form

    Zod
