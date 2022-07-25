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
    emun: [ 'working', 'pending', 'finish' ],
    default: 'working'
  },
  pictures: {
    type: [ String ],
    default: []
  },
  skills: {
    type: [ String ],
    required: true
  },
}, {
  toJSON: {
    transform: function(doc, ret){
      delete ret.__v
      ret.id = ret._id      
      delete ret._id
      delete ret.password
    }
  }
})

export default model('Project', ProjectSchema);