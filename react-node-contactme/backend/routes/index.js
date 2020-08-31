const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const credentials = require('../config/config');

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: credentials.USER,
    pass: credentials.PASS
  }
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send-email', (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const content = `name: ${firstName} ${lastName} \n email: ${email} \n message: ${message}`;

  const mail = {
    from: `${firstName} ${lastName}`,
    to: 'RECEIVING EMAIL ADDRESS', // Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      });
    } else {
      res.json({
        msg: 'success'
      });
    }
  });
});

module.exports = router;
