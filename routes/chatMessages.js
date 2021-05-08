const router = require('express').Router();
const {
  createMessage
} = require('../controllers/chatMessageController');

router.post('/', createMessage);



module.exports = router;
