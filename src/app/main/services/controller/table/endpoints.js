import service from "../../instance"

export const create = (payload) =>
  service.post("table", payload)

export const update = (id, payload) =>
  service.put(`table/${id}`, payload)

export const destroy = (id) =>
  service.delete(`table/${id}`)

export const getById = (id) =>
  service.get(`table/${id}`)

export const list = (params) =>
  service.get(`table`, { params })