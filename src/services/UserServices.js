import axios from './axios';

export const indexUser = async (body) => 
  await axios.post('user', body)

export const updatedUser = async (id, body) => 
  await axios.put(`user/${id}`, body)

export const uploadUser = async (id, file) => 
  await axios.post(`user/upload/${id}`, file)

export const deletedUser = async (id) => 
  await axios.delete(`user/${id}`)

export const showUser = async (id) => 
  await axios.get(`user/${id}`)