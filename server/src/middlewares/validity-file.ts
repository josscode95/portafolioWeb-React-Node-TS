import { Request, Response, NextFunction } from 'express';

export const validateFile = (req:Request, res:Response, next:NextFunction) => {

  if(!req.files || Object.keys(req.files).length === 0) return res.status(400).json({msg:'No files were uploaded'});
  if(!req.files.archivo) return res.status(400).json({msg:'No files were uploaded'});

  next();

}