const mongoose = require('mongoose');

async function main() {
    mongoose.connect(process.env.DB_CONNECTION_STRING,{
     useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true
    });
}
module.exports = main;
