import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String, 
    required: true
  },
  business: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, {
  toJSON: {
    transform: function(doc, ret){
      delete ret.__v
      ret.id = ret._id
      delete ret._id
    }
  }
})

export default model('Message', MessageSchema);