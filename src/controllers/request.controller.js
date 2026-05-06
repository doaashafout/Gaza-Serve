const requestRepo = require('../repositories/request.repository');
const technicianRepo = require('../repositories/technician.repository');

const createRequest = async (req, res, next) => {
  try {
    const { telegramUserId, category, description, location, phone } = req.body;

    const newRequest = await requestRepo.createRequest({
      telegramUserId,
      category,
      description,
      location,
      phone,
    });

    let technician = null;
    if (category) {
      const technicians = await technicianRepo.findTechniciansByCategory(category);
      if (technicians.length > 0) {
        technician = technicians[0];
        await requestRepo.updateRequestStatus(newRequest.id, 'assigned');
        newRequest.status = 'assigned';
      }
    }

    res.status(201).json({
      success: true,
      message: 'Service request created successfully',
      data: newRequest,
      assignedTechnician: technician,
    });
  } catch (err) {
    next(err);
  }
};

const getRequestsByUser = async (req, res, next) => {
  try {
    const { telegramUserId } = req.params;
    const requests = await requestRepo.getRequestsByTelegramUserId(telegramUserId);

    res.status(200).json({
      success: true,
      message: 'Requests fetched successfully',
      data: requests,
    });
  } catch (err) {
    next(err);
  }
};

const getAllRequests = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const requests = await requestRepo.getAllRequests(filter);

    res.status(200).json({
      success: true,
      message: 'Requests fetched successfully',
      data: requests,
    });
  } catch (err) {
    next(err);
  }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'assigned', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const updated = await requestRepo.updateRequestStatus(id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Request status updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRequest,
  getRequestsByUser,
  getAllRequests,
  updateRequestStatus,
};
