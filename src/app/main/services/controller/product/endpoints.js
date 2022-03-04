import service from "../../instance"

export const create = (payload) =>
  service.post("product", payload)

export const update = (id, payload) =>
  service.put(`product/${id}`, payload)

export const destroy = (id) =>
  service.delete(`product/${id}`)

export const getById = (id) =>
  service.get(`product/${id}`)

export const list = (params) =>
  service.get(`product`, { params })