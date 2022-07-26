import { Request, Response } from 'express';

import Project from '../models/project';
import { uploadFile } from '../helpers/upload-file';

export const getProjects = async(req:Request, res:Response) => {
  const [ total, projects ] = await Promise.all([
    Project.countDocuments(),
    Project.find()
  ])
  res.json({total, projects}) 
}

export const getOneProject = async(req:Request, res:Response) => {
  const { id } = req.params;
  const project = await Project.findById( id );
  res.json( project )
}

export const createProject = async(req:Request, res:Response) => {
  const { ...body } = req.body;
  const projectDB = await Project.findOne({title:body.title})
  if( projectDB ) return res.status(400).json({
    msg: `The project ${ projectDB.title }, already exist.`
  })
  const data = { ...body }
  const project = new Project( data )
  const pathPictures = await uploadFile(req.files, undefined)
  project.pictures = pathPictures;
  await project.save()
  res.status(201).json( project )
}

export const updateProject = async(req:Request, res:Response) => {
  const { id } = req.params;
  const { ...body } = req.body;
  const projectUpdate = await Project.findByIdAndUpdate(id, body, { new: true })
  res.json(projectUpdate)
}