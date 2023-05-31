import { Model, Schema, model } from 'mongoose'
import { UserType } from './users.interface'

type UserModel = Model<UserType, object>

const userSchema = new Schema<UserType, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User = model<UserType, UserModel>('User', userSchema)

export default User
