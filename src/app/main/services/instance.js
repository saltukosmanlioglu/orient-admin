import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost/admin',
})

export default instance