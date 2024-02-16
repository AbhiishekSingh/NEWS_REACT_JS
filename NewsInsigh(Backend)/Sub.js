const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json());


mongoose.connect('mongodb+srv://abhishek:abhisingh@cluster0.7j4lqyz.mongodb.net/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);


app.post('/api/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

  
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const newUser = new User({ username, password: hashedPassword });

  
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Sign in successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
    console.log("Done");
  console.log("Server is running on port" ,{port});
});