const nodemailer = require("nodemailer");
require('dotenv').config()


async function sendMail(email,subject,text,output) {
   

     
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "homir007@gmail.com",
          pass: "dark4dark",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      let info = await transporter.sendMail({
        from: "Crypto",
        to: email,
        subject: subject,
        text: text,
        html: output,
      });
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {sendMail}