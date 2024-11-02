const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const userController = require('../controllers/userController')
const { TokenMiddleware, generateToken, removeToken } = require('../middleware/TokenMiddleware');

// Function to hash password
const hashPassword = async (password) => {
  try {
    // Generate a salt with cost factor 5
    const saltRounds = 5;
    // Hash password and salt together
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

// Function to verify password
const verifyPassword = async (password, hash) => {
  try {
    // Compare password with hash
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    throw new Error('Error verifying password');
  }
};


//get user by email
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userController.getUserByEmail(email)
    console.log("user", user)
    if (!user) {
      return res.status(405).json({ error: 'User not found' });
    }
    const isValid = await verifyPassword(password, user.password);
    console.log("valid", isValid)

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const filteredUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    generateToken(req, res, filteredUser)

    console.log("after token created");

    return res.status(200).json({ success: true, message: 'Logged in' });
  }
  catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

//get user by email
router.get('/email/:email', (req, res) => {
  const email = req.params.email
  userController.getUserByEmail(email).then(user => {
    if (user) {
      res.json(user)
    }
    else {
      res.status(405).json({ error: 'User not found' });
    }
  }).catch(err => {
    console.error('Error getting user', err);
    res.status(500).json({ error: 'Failed to get user' });
  });
});

router.get('/current', TokenMiddleware, (req, res) => {
  if (!req.user.id) {
    res.status(401).json({ status: 401, error: req.user });
  }
  res.json(req.user);
});

// Get user by id 
router.get('/id/:id', (req, res) => {
  const id = req.params.id
  userController.getUserById(id).then(user => {
    res.json(user);
  }).catch(err => {
    console.error('Error getting user', err);
    res.status(500).json({ error: 'Failed to get user' });
  });
});

router.get('/', (req, res) => {
    res.send("hi")
  }
);

// Add user
router.post('/', async (req, res) => {
  const { email, username, password } = req.body;

  try {

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword)

    const user = await userController.createUser(email, username, hashedPassword)
    res.json(user);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;