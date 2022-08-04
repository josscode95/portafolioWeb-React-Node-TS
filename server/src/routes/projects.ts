import { Router } from "express";
import { check } from "express-validator";
import { validityFields, validityJWT } from "../middlewares";
import { getProjects, getOneProject, createProject, updateProject } from '../controllers/projectsController';
import { existProject } from '../helpers/db-validators';
import { validateFile } from '../middlewares/validity-file';

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
    validateFile,
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validityFields
  ],
  createProject
)

//we create path to update one project
router.put(
  '/:id',
  [
    validityJWT,
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('skills', 'What are your skills').isArray({min:1}),
    validityFields
  ],
  updateProject
)

module.exports = router;