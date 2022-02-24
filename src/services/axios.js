import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: 'https://application-messages.herokuapp.com/api',
  header: {
    'Content-Type': 'application/json',
  },
  headers: {
    'Authorization': `${localStorage.getItem('token')}`
  }
})

export default axiosConfig