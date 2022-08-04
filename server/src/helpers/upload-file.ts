import { v4 as uuidv4 } from "uuid";
import path from 'path';

export const uploadFile = (reqFiles:any, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], container = '') => {

  return new Promise((resolve, reject) => {
    const { archivo } = reqFiles;
    const files:any = Object.values(archivo)
    const arrayFiles:any = [];
    for(let i = 0; i < files.length; i++){
      const nameCut = files[i].name.split('.');
      const extension = nameCut[ nameCut.length - 1 ];
      //validar extension
      if(!validExtensions.includes(extension)) return reject(`The extension ${extension}, doesn't exist in ${validExtensions}`);
      const nameTemp = uuidv4() + '.' + extension;
      const uploadPath = path.join(__dirname, '../../src/uploads/', container, nameTemp);
      arrayFiles.push(nameTemp + '')  
      files[i].mv(uploadPath, (err:any) => {
        if( err ){
          return reject( err )
        }
        resolve( arrayFiles )
      })
    } 
  })

}