const { readData, appendData, writeData, generateId } = require('../storage/fileStorage');

const getAllUsers = async () => {
  return await readData('users');
};

const getUserByTelegramId = async (telegramUserId) => {
  const users = await readData('users');
  return users.find((u) => u.telegramUserId === telegramUserId) || null;
};

const createUser = async (userData) => {
  const newUser = {
    id: generateId(),
    telegramUserId: userData.telegramUserId,
    fullName: userData.fullName || 'User',
    role: userData.role || 'user',
    phone: userData.phone || null,
    location: userData.location || null,
    createdAt: new Date().toISOString(),
  };

  await appendData('users', newUser);
  return newUser;
};

const getOrCreateUser = async (telegramUserId, fullName) => {
  let user = await getUserByTelegramId(telegramUserId);

  if (!user) {
    user = await createUser({ telegramUserId, fullName });
  }

  return user;
};

const updateUserProfile = async (telegramUserId, updateData) => {
  const users = await readData('users');
  const index = users.findIndex((u) => u.telegramUserId === telegramUserId);

  if (index === -1) {
    return null;
  }

  users[index] = { ...users[index], ...updateData };
  users[index].updatedAt = new Date().toISOString();

  await writeData('users', users);
  return users[index];
};

module.exports = {
  getAllUsers,
  getUserByTelegramId,
  createUser,
  getOrCreateUser,
  updateUserProfile,
};
