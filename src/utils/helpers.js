const formatResponse = (success, message, data = null) => {
  return {
    success,
    message,
    ...(data !== null && { data }),
  };
};

const isValidTelegramId = (id) => {
  return typeof id === 'string' && /^\d+$/.test(id);
};

module.exports = {
  formatResponse,
  isValidTelegramId,
};
