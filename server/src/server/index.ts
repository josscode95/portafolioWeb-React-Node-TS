import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import keys from '../keys';
import dbConnection from '../database';
import { Path } from '../interfaces';

export default class Server{

  private app:express.Application;
  private port:number;
  private paths:Path;

  constructor(){
    this.port = Number(keys.PORT);
    this.app = express();
    this.paths = {
      projects: '/projects',
      messages: '/messages',
      auth: '/auth'
    }
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  private async conectarDB(){
    await dbConnection()
  }

  private middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(morgan('dev'))
  }

  private routes(){
    this.app.use(this.paths.projects, require('../routes/projects'))
    this.app.use(this.paths.auth, require('../routes/users'))
    this.app.use(this.paths.messages, require('../routes/messages'))
  }

  public listen(){
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port);
    })
  }

}