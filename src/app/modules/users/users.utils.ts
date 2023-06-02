import User from './users.model'

export const getExistingUserId = async () => {
  const UserId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return UserId?.id
}

export const generatedUserId = async () => {
  const currentId =
    (await getExistingUserId()) || (0).toString().padStart(5, '0')

  return currentId
}
