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

}

export const createProject = async(req:Request, res:Response) => {
  
}