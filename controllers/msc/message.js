const Message = (msg, status = false) => {
  const responseObj = { success: status, message: msg };
  return responseObj;
};

module.exports = { Message };
