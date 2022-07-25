import { Request, Response } from 'express';

import Project from '../models/project';

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
  await project.save()
  res.status(201).json( project )
}