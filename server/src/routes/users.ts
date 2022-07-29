import { Router } from "express";
import { check } from "express-validator";
import { userLogin, renewToken } from "../controllers/usersController";
import { validityFields } from "../middlewares/validity-fields";
import { validityJWT } from "../middlewares/validity-jwt";

const router = Router();

//the path is temporary to create my user admin
// router.post(
//   '/new', 
//   [
//     check('name', 'The name is required').not().isEmpty(), 
//     check('password', 'The password is required').not().isEmpty(),
//     check('email', 'The email is required').isEmail(),
//     validityFields
//   ],
//   createUser
// );

//login
router.post(
  '/',
  [
    check('password', 'The password is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    validityFields
  ],
  userLogin
);

//renovation token
router.get(
  '/renew',
  validityJWT,
  renewToken
);

module.exports = router;