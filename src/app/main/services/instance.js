import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Auhorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJoYWthbiIsImlhdCI6MTY0NjY0NDQyMywiZXhwIjoxNjQ2NjUxNjIzfQ.MuMzhsInirL5-BNGI2K8kNq2Zq2gciZn3G5So4FrtAQ`
  }
})

export default instance