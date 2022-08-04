import { Router } from "express";
import { check } from "express-validator";

import { validityFields, validateFile } from '../middlewares';
import { fileUpload, updatedImage, showImages, updatedImageCloudinary } from '../controllers/uploadController';
import { containersAllowed } from '../helpers/db-validators';

const router = Router();

router.post('/', validateFile, fileUpload)

router.put(
  '/:container/:id', 
  [
    validateFile,
    check('id', 'Must be a mongoDB ID').isMongoId(),
    check('container').custom(c => containersAllowed(c, ['projects'])),
    validityFields
  ], 
  updatedImageCloudinary
)

router.get(
  '/:container/:id',
  [
    check('id', 'Must be a mongoDB ID').isMongoId(),
    check('container').custom(c => containersAllowed(c, ['projects'])),
    validityFields
  ],
  showImages
)

module.exports = router;