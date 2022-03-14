import service from "../../instance"

export const create = (payload) =>
  service.post("product-locale", payload)

export const update = (id, payload) =>
  service.put(`product-locale/${id}`, payload)

export const destroy = (id) =>
  service.delete(`product-locale/${id}`)

export const getById = (id) =>
  service.get(`product-locale/${id}`)

export const list = (params) =>
  service.get(`product-locale`, { params })