import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3000/api',
  header: {
    'Content-Type': 'application/json',
  },
  headers: {
    'Authorization': `${localStorage.getItem('token')}`
  }
})

export default axiosConfig