// /utils/apiMethods.js

export function sendOk(res, data) {
  return res.status(200).json({ success: true, data });
}

export function sendBadRequest(res, message) {
  return res.status(400).json({ success: false, error: message });
}
