import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import keys from '../keys';

export const validityJWT = (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.header('x-token');
    if( !token ) return res.status(401).json('The token is needed for the request');
    const payload:any = jwt.verify(token, keys.KEY_JWT);
    req.uid = payload.uid;
    next();
  } catch (error) {
    res.status(401).json({ok:false, msg:'The token is invalid or has expired'})
  }
}
