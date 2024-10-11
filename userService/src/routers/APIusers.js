const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

//get user by email
router.get('/email/:email', (req, res) => {
    const email = req.params.email
    userController.getUserByEmail(email).then(user => {
      if (user) {
        res.json(user)
      }
      else {
        res.status(404).json({error: 'User not found'});
      }
    }).catch(err => {
        console.error('Error getting user', err);
        res.status(500).json({ error: 'Failed to get user' });
    });
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



// Add user
router.post('/', (req, res) => {
    const { email, username} = req.body;
    userController.createUser(email, username)
    .then(newUser => {
        console.log(newUser)
      res.json({id: newUser});
    })
    .catch(err => {
      console.error('Error creating user: ', err);
      res.status(500).json({ error: 'Failed to create user' });
    });
  });

module.exports = router;