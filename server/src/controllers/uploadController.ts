import keys from "../keys";

import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import cloudinary from "cloudinary";
const cloudImg = cloudinary.v2;
cloudImg.config(keys.CLOUD_IMG)

import { uploadFile } from "../helpers";
import Project from "../models/project";

export const fileUpload = async(req:Request, res:Response) => {

  try {
    const pathImages = await uploadFile(req.files, undefined, 'projects') 
    res.json({pathImages})
  } catch (msg) {
    res.status(400).json({msg})
  }

}

export const updatedImage = async(req:Request, res:Response) => {
  
  const { id, container } = req.params;
  
  let model;

  switch( container ){
    case 'projects':
      model = await Project.findById(id)
      if(!model) return res.status(400).json({msg:`There is no project with this id ${id}`})
      break;
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'})
  }

  const pathPictures = await uploadFile(req.files, undefined, 'projects')
  model.pictures = pathPictures;
  
  await model.save();

  res.json(model)

}

export const updatedImageCloudinary = async(req:Request, res:Response) => {
  
  const { id, container } = req.params;
  
  let model;

  switch( container ){
    case 'projects':
      model = await Project.findById(id)
      if(!model) return res.status(400).json({msg:`There is no project with this id ${id}`})
      break;
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'})
  }

  const {archivo}:any = req.files;
  const files:any = Object.values(archivo);
  const arrayFiles = [];

  for (let i = 0; i < files.length; i++) {
    const { secure_url } = await cloudImg.uploader.upload(files[i].tempFilePath);
    arrayFiles.push(secure_url)
  }

  model.pictures = arrayFiles;
  await model.save();
  res.json(model)

}


//solo funciona con una sola imagen
export const showImages = async(req:Request, res:Response) => {

  const { id, container } = req.params;

  let model;

  switch( container ){
    case 'projects':
      model = await Project.findById(id)
      if(!model) return res.status(400).json({msg:`There is no project with this id ${id}`})
      break;
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'})
  }

  const arrayImgs = []

  if(model.pictures){
    const arrayFiles = model.pictures;
    for(let i = 0; i < arrayFiles.length; i++){
      const pathImages = path.join(__dirname, '../../src/uploads/', container, arrayFiles[i])
      if(fs.existsSync(pathImages)){
        arrayImgs.push(pathImages)
      }
    }
  }

  res.json(arrayImgs)

}