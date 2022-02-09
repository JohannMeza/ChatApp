import axios from './axios';

export const index = async () => 
  await axios.get('user')

export const show = async (id) => 
  await axios.get(`user/${id}`)