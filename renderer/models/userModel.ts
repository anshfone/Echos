import { Schema, Types, model, models } from 'mongoose';

const userSchema = new Schema({  
  username: String,
  email: String,
  password: String,
  profileImg: Types.ObjectId
})
// const Users = model('Users', userSchema,"Users");

export const Users = models.Users || model("Users",userSchema,"Users")
