const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db'); // assume this exports a function connectDB
const cookieParser = require('cookie-parser');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
app.use(cors({
    // origin: "http://localhost:5173",
   origin:'https://mainwebtask.netlify.app/',
  credentials:true
}));


app.use(express.json());
app.use(cookieParser());
app.use('/', projectRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Debug logs for environment
console.log('== Starting server file ==');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT env:', process.env.PORT);
console.log('FRONTEND_URL:', FRONTEND_URL);
console.log('MONGO_URI present?:', !!process.env.MONGO_URI);

// Start DB then server
(async () => {
  try {
    await connectDB(); // connectDB should resolve when DB connected or throw
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log('✅ Server listening at port number : ' + PORT);
    });
  } catch (err) {
    console.error('❌ Failed to start server because DB connection failed:', err);
    // don't crash immediately in debug; you may optionally process.exit(1)
  }
})();
