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
})

export default model('User', UserSchema);