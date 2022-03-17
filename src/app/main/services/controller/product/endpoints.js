import service from "../../instance"

export const create = (payload) => {
  if (payload.subCategoryId === "0") delete payload.subCategoryId
  if (payload.categoryId === "0") delete payload.categoryId

  Object.keys(payload).forEach((key) =>
    payload[key] === undefined ? delete payload[key] : {}
  )

  return service.post("product", payload)
}

export const update = (id, payload) => {
  if (Number(payload.subCategoryId) === 0) delete payload.subCategoryId
  if (Number(payload.categoryId) === 0) delete payload.categoryId

  Object.keys(payload).forEach((key) =>
    payload[key] === undefined ? delete payload[key] : {}
  )

  return service.put(`product/${id}`, payload)
}

export const destroy = (id) =>
  service.delete(`product/${id}`)

export const getById = (id) =>
  service.get(`product/${id}`)

export const list = (params) =>
  service.get(`product`, { params })

export const reorder = (payload) =>
  service.post("product/reorder", payload)
