import service from "../../instance"

export const login = (payload) =>
  service.post("auth/login", payload).then((response) => {
    service.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`
    window.localStorage.setItem('jwt_access_token', response.data.token)
    return response
  })

export const register = async (payload) =>
  service.post("auth/register", payload).then((response) => {
    service.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`
    return response
  })

export const accessToken = async (payload) =>
  service.get("auth/access-token", payload)