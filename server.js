const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mojtaba.saad1999@gmail.com",
    pass: "ksmpvxvnildhqzuw"
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