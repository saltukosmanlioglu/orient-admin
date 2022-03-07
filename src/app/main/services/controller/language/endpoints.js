import service from "../../instance"

export const create = (payload) =>
  service.post("language", payload)

export const update = (id, payload) =>
  service.put(`language/${id}`, payload)

export const destroy = (id) =>
  service.delete(`language/${id}`)

export const getById = (id) =>
  service.get(`language/${id}`)

export const list = (params) =>
  service.get(`language`, { params })