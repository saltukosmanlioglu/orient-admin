import service from "../../instance"

export const create = (payload) =>
  service.post("sub-category", payload)

export const update = (id, payload) =>
  service.put(`sub-category/${id}`, payload)

export const destroy = (id) =>
  service.delete(`sub-category/${id}`)

export const getById = (id) =>
  service.get(`sub-category/${id}`)

export const list = (params) =>
  service.get(`sub-category`, { params })

export const reorder = (payload) =>
  service.post("sub-category/reorder", payload)
