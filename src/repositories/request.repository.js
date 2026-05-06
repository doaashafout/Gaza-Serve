const { readData, appendData, writeData } = require('../storage/fileStorage');

const getAllRequests = async (filters = {}) => {
  let requests = await readData('requests');

  if (filters.status) {
    requests = requests.filter((r) => r.status === filters.status);
  }

  requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return requests;
};

const getRequestById = async (id) => {
  const requests = await readData('requests');
  return requests.find((r) => r.id === id) || null;
};

const createRequest = async (requestData) => {
  const { generateId } = require('../storage/fileStorage');
  const newRequest = {
    id: generateId(),
    ...requestData,
    status: requestData.status || 'pending',
    createdAt: new Date().toISOString(),
  };

  await appendData('requests', newRequest);
  return newRequest;
};

const updateRequestStatus = async (id, status) => {
  const requests = await readData('requests');
  const index = requests.findIndex((r) => r.id === id);

  if (index === -1) {
    return null;
  }

  requests[index].status = status;
  requests[index].updatedAt = new Date().toISOString();

  await writeData('requests', requests);
  return requests[index];
};

const getRequestsByTelegramUserId = async (telegramUserId) => {
  const requests = await readData('requests');
  const filtered = requests
    .filter((r) => r.telegramUserId === telegramUserId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return filtered;
};

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  getRequestsByTelegramUserId,
};
