import { Request, Response } from "express";

import Message from "../models/message";

export const getMessages = async(req:Request, res:Response) => {
  const [ total, messages ] = await Promise.all([
    Message.countDocuments(),
    Message.find()
  ])
  res.json({total, messages})
}

export const createMessage = async(req:Request, res:Response) => {
  const { ...data } = req.body;
  const message = { ...data }
  const newMessage = new Message( message )
  await newMessage.save()
  res.status(201).json( newMessage )
}
