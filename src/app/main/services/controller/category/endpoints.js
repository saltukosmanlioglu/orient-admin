import service from '../../instance'

export const create = (payload) => service.post('category', payload)

export const update = (id, payload) => service.put(`category/${id}`, payload)

export const destroy = (id) => service.delete(`category/${id}`)

export const getById = (id) => service.get(`category/${id}`)

export const list = (params) => service.get(`category`, { params })

export const reorder = (payload) => service.post(`category/reorder`, payload)
