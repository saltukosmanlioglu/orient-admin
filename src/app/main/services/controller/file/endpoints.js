import service from "../../instance"

export const upload = (payload) => {
  var formData = new FormData();

  formData.append('image', payload);

  service.post("upload", {
    params: payload,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData
  })
}
export const serve = () =>
  service.get("serve")