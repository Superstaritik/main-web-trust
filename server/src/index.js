const express = require('express');
const app = express();
require('dotenv').config();
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
app.use(cors({
    origin: "http://localhost:5173",
//   origin:'https://project-frontend-vnxh.onrender.com',
  credentials:true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/',projectRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

main()
.then(async ()=>{
    const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening at port number : " + PORT);
});
})
.catch((err)=>{
    console.log("error occured "+err);
})
