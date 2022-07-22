import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  members: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    emun: [ 'working', 'pending', 'finish' ]
  },
  pictures: {
    type: [ String ],
    required: true
  },
  skills: {
    type: [ String ],
    required: true
  },
})

export default model('Project', ProjectSchema);