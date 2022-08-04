import keys from "../keys";

import cloudinary from "cloudinary";
const cloudImg = cloudinary.v2;
cloudImg.config(keys.CLOUD_IMG)

export const uploadFile = (reqFiles:any, validExtensions = ['png', 'jpg', 'jpeg', 'gif']) => {

  return new Promise(async(resolve, reject) => {
    const { archivo } = reqFiles;
    const files:any = Object.values(archivo)
    const arrayFiles:any = [];
    for(let i = 0; i < files.length; i++){
      const nameCut = files[i].name.split('.');
      const extension = nameCut[ nameCut.length - 1 ];
      //validar extension
      if(!validExtensions.includes(extension)) return reject(`The extension ${extension}, doesn't exist in ${validExtensions}`);
      const { secure_url } = await cloudImg.uploader.upload(files[i].tempFilePath);
      arrayFiles.push(secure_url)
    } 
    if( arrayFiles.length === 0 ){
      reject('Hubo un problema no se cargo las imagenes')
    }else{
      resolve( arrayFiles )
    }
  })

}