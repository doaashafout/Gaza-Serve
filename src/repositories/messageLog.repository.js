const { readData, appendData, generateId } = require('../storage/fileStorage');

const getAllMessageLogs = async (telegramUserId, limit = 50) => {
  let logs = await readData('messageLogs');

  if (telegramUserId) {
    logs = logs.filter((l) => l.telegramUserId === telegramUserId);
  }

  logs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return logs.slice(0, limit);
};

const createMessageLog = async (logData) => {
  const newLog = {
    id: generateId(),
    telegramUserId: logData.telegramUserId,
    rawMessage: logData.rawMessage,
    detectedCategory: logData.detectedCategory || null,
    response: logData.response || null,
    createdAt: new Date().toISOString(),
  };

  await appendData('messageLogs', newLog);
  return newLog;
};

module.exports = {
  getAllMessageLogs,
  createMessageLog,
};
