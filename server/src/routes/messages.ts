import { Router } from "express";
import { check } from "express-validator";
import { validityFields, validityJWT } from '../middlewares';
import { getMessages, createMessage } from '../controllers/messagesController';

const router = Router();

//i get all messages
router.get(
  '/',
  validityJWT,
  getMessages
)

//create message trough front
router.post(
  '/',
  [
    check('title', 'The title is required').not().isEmpty(),
    check('message', 'The message is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    validityFields
  ],
  createMessage
)


module.exports = router;