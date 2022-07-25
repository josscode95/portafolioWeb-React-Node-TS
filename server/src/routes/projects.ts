import { Router } from "express";
import { check } from "express-validator";
import { validityFields, validityJWT } from "../middlewares";
import { getProjects, getOneProject, createProject } from '../controllers/projectsController';
import { existProject } from '../helpers/db-validators';

const router = Router();

//we obtain all the projects
router.get('/', getProjects);

//we obtain one project by id
router.get(
  '/:id',
  [
    check('id', 'Must be a mongoDB ID').isMongoId(),
    check('id').custom( existProject ),
    validityFields
  ],
  getOneProject
);

//we create one project - path private - validate Token
router.post(
  '/',
  [
    validityJWT,
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('skills', 'What are your skills').isArray({min:1, max:5}),
    validityFields
  ],
  createProject
)

module.exports = router;