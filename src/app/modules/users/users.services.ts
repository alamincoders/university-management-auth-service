import config from '../../../config'
import { UserType } from './users.interface'
import User from './users.model'
import { generatedUserId } from './users.utils'

export const createUser = async (user: UserType): Promise<UserType | null> => {
  // auto generated students id
  const userId = await generatedUserId()
  user.id = userId

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
