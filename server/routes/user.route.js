const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

// Backend routes
router.get('/users', user_controller.users);
router.get('/users/:id', user_controller.user_details);
router.post('/users/create', user_controller.user_create);
router.put('/users/:id/update', user_controller.user_update);
router.delete('/users/:id/delete', user_controller.user_delete);

module.exports = router;