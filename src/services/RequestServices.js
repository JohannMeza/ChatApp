import axios from './axios';

export const showRequest = async (id) => 
  await axios.get(`/request/${id}`)
  
export const storeRequest = async (body) =>
  await axios.post('/request', body)

export const updateRequest = async (id, body) => 
  await axios.put(`/request/${id}`, body)

