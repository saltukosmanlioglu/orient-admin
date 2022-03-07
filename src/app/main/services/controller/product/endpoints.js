import service from "../../instance"

export const create = (payload) => {
  if (payload.subCategoryId) delete payload.categoryId
  Object.keys(payload).forEach((key) =>
    payload[key] === undefined ? delete payload[key] : {}
  )
  return service.post("product", payload)
}

export const update = (id, payload) =>
  service.put(`product/${id}`, payload)

export const destroy = (id) =>
  service.delete(`product/${id}`)

export const getById = (id) =>
  service.get(`product/${id}`)

export const list = (params) =>
  service.get(`product`, { params })