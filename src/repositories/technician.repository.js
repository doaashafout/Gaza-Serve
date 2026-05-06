const { readData, appendData, writeData, generateId } = require('../storage/fileStorage');

const getAllTechnicians = async (filters = {}) => {
  let technicians = await readData('technicians');

  if (filters.availability !== undefined) {
    technicians = technicians.filter(
      (t) => t.availability === filters.availability
    );
  }

  if (filters.categoryId) {
    technicians = technicians.filter((t) =>
      t.categories.some((c) => c.id === filters.categoryId || c === filters.categoryId || c.toString() === filters.categoryId.toString())
    );
  }

  return technicians;
};

const getTechnicianByTelegramId = async (telegramUserId) => {
  const technicians = await readData('technicians');
  return technicians.find((t) => t.telegramUserId === telegramUserId) || null;
};

const createTechnician = async (techData) => {
  const existing = await getTechnicianByTelegramId(techData.telegramUserId);
  if (existing) {
    throw new Error('Technician already registered');
  }

  const newTechnician = {
    id: generateId(),
    telegramUserId: techData.telegramUserId,
    name: techData.name,
    phone: techData.phone,
    categories: techData.categories || [],
    location: techData.location || null,
    availability: techData.availability !== undefined ? techData.availability : true,
    createdAt: new Date().toISOString(),
  };

  await appendData('technicians', newTechnician);
  return newTechnician;
};

const updateAvailability = async (telegramUserId, availability) => {
  const technicians = await readData('technicians');
  const index = technicians.findIndex(
    (t) => t.telegramUserId === telegramUserId
  );

  if (index === -1) {
    return null;
  }

  technicians[index].availability = availability;
  technicians[index].updatedAt = new Date().toISOString();

  await writeData('technicians', technicians);
  return technicians[index];
};

const findTechniciansByCategory = async (categoryId) => {
  return await getAllTechnicians({
    availability: true,
    categoryId,
  });
};

module.exports = {
  getAllTechnicians,
  getTechnicianByTelegramId,
  createTechnician,
  updateAvailability,
  findTechniciansByCategory,
};
