const send404 = (res, message) => res.status(404).json({ error: message });

const send500 = (res, message) => res.status(500).json({ error: message });

const sendSuccess = (res, data) => res.status(200).json(data);

export {
  send404,
  send500,
  sendSuccess,
};
