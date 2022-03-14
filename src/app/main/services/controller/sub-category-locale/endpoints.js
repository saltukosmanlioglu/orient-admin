import service from "../../instance"

export const create = (payload) =>
  service.post("sub-category-locale", payload)

export const update = (id, payload) =>
  service.put(`sub-category-locale/${id}`, payload)

export const destroy = (id) =>
  service.delete(`sub-category-locale/${id}`)

export const getById = (id) =>
  service.get(`sub-category-locale/${id}`)

export const list = (params) =>
  service.get(`sub-category-locale`, { params })