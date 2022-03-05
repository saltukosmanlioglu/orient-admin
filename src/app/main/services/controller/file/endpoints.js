import service from "../../instance"

export const upload = (payload) =>
  service({
    method: 'POST',
    url: 'file/upload',
    data: payload,
    headers: { "Content-Type": "multipart/form-data" },
  })