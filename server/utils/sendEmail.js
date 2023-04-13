const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,

    service: "gmail",
    auth: {
      user: "m.aliyousaf1133@gmail.com",
      pass: "bpolubabrogpdqxb",
    },
  });
  const mailOptions = {
    from: "m.aliyousaf1133@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
