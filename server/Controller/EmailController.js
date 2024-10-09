const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  try {
    const { from, to, subject, text } = req.body;

    // this is a transporter with SMTP configuration
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: from, 
        pass: 'cupl btap ttxi ofhj'
      }
    });

    // this is Send mail with defined transport object
    const info = await transporter.sendMail({
      from, 
      to,
      subject,
      text
    });

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};
module.exports = {sendEmail};





