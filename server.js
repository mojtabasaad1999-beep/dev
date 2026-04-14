const express = require("express");
const { Resend } = require("resend");

const app = express();

// 🔐 Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", async (req, res) => {
  // 📊 Visitor info
  const ip =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const message = `
New visit 🚨
IP: ${ip}
Device: ${userAgent}
Time: ${new Date().toISOString()}
`;

  try {
    // 📧 Send email
    await resend.emails.send({
      from: "onboarding@resend.dev", // default test sender
      to: "mojtaba.saad1999@gmail.com", // 👈 change if needed
      subject: "New Link Opened",
      text: message,
    });

    console.log("Email sent ✅");
  } catch (err) {
    console.log("Email error ❌:", err);
  }

  // 🔁 Redirect
  res.redirect(
    "https://journals.sagepub.com/doi/10.1177/02683962231207108"
  );
});

// 🌍 Use dynamic port (important for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});