import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  password: {
    type: String,
    required: [ true, 'el password es obligatorio' ],
    unique: true
  }
}, {
  toJSON: {
    transform: function(doc, ret){
      delete ret.__v
      ret.uid = ret._id      
      delete ret._id
      delete ret.password
    }
  }
})

export default model('User', UserSchema);