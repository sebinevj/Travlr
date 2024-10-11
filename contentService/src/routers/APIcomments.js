const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController')

// Get comment by id 
router.get('/:id', (req, res) => {
    const id = req.params.id
    commentController.getCommentById(id).then(user => {
      res.json(user);
    }).catch(err => {
        console.error('Error getting user', err);
        res.status(500).json({ error: 'Failed to get user' });
    });
  });


// Add comment
router.post('/', (req, res) => {
  const { user_id, post_id, description} = req.body;
  commentController.createComment(user_id, post_id, description)
  .then(newComment => {
      console.log(newComment)
    res.json({id: newComment});
  })
  .catch(err => {
    console.error('Error creating user: ', err);
    res.status(500).json({ error: 'Failed to create user' });
  });
});


module.exports = router;