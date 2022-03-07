import service from "../../instance"

export const create = (payload) =>
  service.post("category-locale", payload)

export const update = (id, payload) =>
  service.put(`category-locale/${id}`, payload)

export const destroy = (id) =>
  service.delete(`category-locale/${id}`)

export const getById = (id) =>
  service.get(`category-locale/${id}`)

export const list = (params) =>
  service.get(`category-locale`, { params })