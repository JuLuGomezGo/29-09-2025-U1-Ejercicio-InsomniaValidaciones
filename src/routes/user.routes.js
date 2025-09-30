const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const router = Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);
router.post('/', UserController.addUser);
router.put('/:id', UserController.updateUser);

module.exports = router;