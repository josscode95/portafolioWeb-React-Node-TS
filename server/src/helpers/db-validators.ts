import Project from "../models/project";

export const existProject = async( id:string ) => {
  if(id.length === 24){
    const existProject = await Project.findById(id)
    if( !existProject ){
      throw new Error(`There is no project with this ID: ${ id } in the database`);
    }
  }else{
    throw new Error(`Must be a mongoDB ID`);
  }
}

export const containersAllowed = (container:string = '', containers:string[] = []) => {
  const incluided = containers.includes(container)
  if(!incluided) throw new Error(`The container ${ container }, is not allowed, ${ containers }`)
  return true;
}