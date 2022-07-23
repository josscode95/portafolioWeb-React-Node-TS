import jwt from 'jsonwebtoken';
import keys from '../keys';

export const generateJWT = ( uid:string ) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, keys.KEY_JWT, {
      expiresIn: '12h'
    }, (err, token) => {
      if( err ){
        reject('There was a problem generating the JWT.')
      }else {
        resolve( token )
      }
    })
  })
}