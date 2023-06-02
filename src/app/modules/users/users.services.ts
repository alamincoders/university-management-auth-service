import config from '../../../config'
import { UserType } from './users.interface'
import User from './users.model'

export const createUser = async (user: UserType): Promise<UserType | null> => {
  // auto generated students id

  // default students password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error('Failed to created user!')
  }

  return createdUser
}
