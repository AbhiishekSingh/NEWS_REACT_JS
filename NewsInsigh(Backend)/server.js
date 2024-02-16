// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://abhishek:abhisingh@cluster0.7j4lqyz.mongodb.net/news",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Create a MongoDB schema and model
const subscriptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  health: Boolean,
  sports: Boolean,
  Science: Boolean,
  Business: Boolean,
  Tech: Boolean,
  Entertainment: Boolean,
  isSubscribed: { type: Boolean, default: true },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abhishek.singgh20@gmail.com",
    pass: "mysyhbquyueslzdk",
  },
});

// API endpoint to handle subscription submissions
app.post("/subscribe", async (req, res) => {
  const {
    name,
    email,
    healthScience,
    sports,
    tech,
    Business,
    Entertainment,
    Science,
  } = req.body;

  try {
    // Save subscription to MongoDB
    const subscription = new Subscription({
      name: name,
      email: email,
      health: healthScience,
      sports: sports,
      Science: Science,
      Business: Business,
      Tech: tech,
      Entertainment: Entertainment,
    });
    await subscription.save();

    const mailOptions = {
      from: "abhishek.singgh20@gmail.com",
      to: email,
      subject: "Subscription Confirmation",
      text:
        `Dear ${name},\n\nThank you for subscribing!\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Health: ${healthScience ? "Yes" : "No"}\n` +
        `Sports: ${sports ? "Yes" : "No"}\n` +
        `Science: ${Science ? "Yes" : "No"}\n` +
        `Business: ${Business ? "Yes" : "No"}\n` +
        `Tech: ${tech ? "Yes" : "No"}\n` +
        `Entertainment: ${Entertainment ? "Yes" : "No"}\n`,
    };

    // console.log("Welcome to DUBAI");
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to handle subscription submissions
app.post("/unsubscribe", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const existingSubscription = await Subscription.findOne({ email });

    if (!existingSubscription) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Update the subscription to mark as unsubscribed
    existingSubscription.isSubscribed = false;
    await existingSubscription.save();

    res.status(200).json({ message: "Unsubscription successful!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
