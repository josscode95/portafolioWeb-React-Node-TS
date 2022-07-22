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
    type: String,
    required: [ true, 'el correo es obligatorio' ],
    unique: true
  }
})

export default model('Message', MessageSchema);