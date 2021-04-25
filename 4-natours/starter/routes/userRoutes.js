const express = require('express');
const router = express.Router();
const userController = require(`${__dirname}/../controllers/userControllers`);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .post(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
