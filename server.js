const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // VERY IMPORTANT (must be false for 587)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const message = `
New visit 🚨
IP: ${ip}
Device: ${userAgent}
Time: ${new Date().toISOString()}
`;

  transporter.sendMail({
    from: "mojtaba.saad1999@gmail.com",
    to: "mojtaba.saad1999@gmail.com",
    subject: "New Link Opened",
    text: message
  });

  res.redirect("https://journals.sagepub.com/doi/10.1177/02683962231207108");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});