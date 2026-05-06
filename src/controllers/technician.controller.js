const technicianRepo = require('../repositories/technician.repository');

const registerTechnician = async (req, res, next) => {
  try {
    const { telegramUserId, name, phone, categories, location } = req.body;

    const technician = await technicianRepo.createTechnician({
      telegramUserId,
      name,
      phone,
      categories,
      location,
    });

    res.status(201).json({
      success: true,
      message: 'Technician registered successfully',
      data: technician,
    });
  } catch (err) {
    if (err.message === 'Technician already registered') {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next(err);
  }
};

const getTechnicianByTelegramId = async (req, res, next) => {
  try {
    const { telegramUserId } = req.params;
    const technician = await technicianRepo.getTechnicianByTelegramId(telegramUserId);

    if (!technician) {
      return res.status(404).json({
        success: false,
        message: 'Technician not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Technician fetched successfully',
      data: technician,
    });
  } catch (err) {
    next(err);
  }
};

const updateAvailability = async (req, res, next) => {
  try {
    const { telegramUserId } = req.params;
    const { availability } = req.body;

    const technician = await technicianRepo.updateAvailability(telegramUserId, availability);

    if (!technician) {
      return res.status(404).json({
        success: false,
        message: 'Technician not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Availability updated successfully',
      data: technician,
    });
  } catch (err) {
    next(err);
  }
};

const getAvailableTechnicians = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    const filter = { availability: true };
    if (categoryId) filter.categoryId = categoryId;

    const technicians = await technicianRepo.getAllTechnicians(filter);

    res.status(200).json({
      success: true,
      message: 'Available technicians fetched successfully',
      data: technicians,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerTechnician,
  getTechnicianByTelegramId,
  updateAvailability,
  getAvailableTechnicians,
};
