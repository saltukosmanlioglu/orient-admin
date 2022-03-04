import service from "../../instance"

export const create = (payload) =>
  service.post("slider", payload)

export const update = (id, payload) =>
  service.put(`slider/${id}`, payload)

export const destroy = (id) =>
  service.delete(`slider/${id}`)

export const getById = (id) =>
  service.get(`slider/${id}`)

export const list = (params) =>
  service.get(`slider`, { params })