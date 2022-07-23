import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'

import User from '../models/user';
import { generateJWT } from '../helpers/jwt';

export const createUser = async(req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    const existEmail = await User.findOne({email});
    if( existEmail ) return res.status(400).json({ ok: false, msg: 'This email already exist' }); // <-- validity email
    const user = new User( req.body ); // <-- user created
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt); // <-- crypt the pass
    await user.save(); // <-- save in DB
    const token = await generateJWT( user.id ) // <-- generate token through user uid
    res.json({ ok: true, user, token }) // RESPONSE 
  } catch (error) {
    res.status(500).json({ok: false, msg: 'There was a problem, talk to the administrator'})
  }
}

export const userLogin = async(req:Request, res:Response) => {
  const { email, password } = req.body;
  try {
    const userDB = await User.findOne({email}) //<-- if found user in DB we obtain userDB
    if( !userDB ) return res.status(404).json({ok:false, msg:'Email not found'}); // <-- validate email if not BREAK 
    const validPassword = bcrypt.compareSync(password, userDB.password); //<-- validate password if not BREAK
    if( !validPassword ) return res.status(400).json({ok:false, msg:'This password is incorrect'});
    const token = await generateJWT( userDB.id ); //<-- generate new token
    res.json({ok:true, user: userDB, token}); 
  } catch (error) {
    res.status(500).json({ok:false, msg:'There was a problem in login user, talk to the administrator'})
  }
}

export const renewToken = async(req:Request, res:Response) => {
  const uid = req.uid || ''; // we obtain uid in req added in function(middleware) validity-jwt
  const token = await generateJWT( uid ); //generate new token based uid
  const user = await User.findById( uid ); //search user base uid
  res.json({ok:true, token, user}) //RESPONSE token and user
}