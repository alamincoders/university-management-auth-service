import User from './users.model';

export const getExistingUserId = async () => {
  const lastUserId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUserId?.id;
};

export const generatedUserId = async () => {
  const currentId =
    (await getExistingUserId()) || (0).toString().padStart(5, '0');

  // increment by 1
  const incrementalId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  return incrementalId;
};
