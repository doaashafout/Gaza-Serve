const userRepo = require('../repositories/user.repository');

const getUserByTelegramId = async (req, res, next) => {
  try {
    const { telegramUserId } = req.params;
    const user = await userRepo.getUserByTelegramId(telegramUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userRepo.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { telegramUserId } = req.params;
    const { fullName, phone, location } = req.body;

    const user = await userRepo.updateUserProfile(telegramUserId, {
      fullName,
      phone,
      location,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrCreateUser: userRepo.getOrCreateUser,
  getUserByTelegramId,
  getAllUsers,
  updateUserProfile,
};
