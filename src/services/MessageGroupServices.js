import axios from './axios';

export const indexMessageGroup = async (id) => 
  await axios.get(`/messageGroup/${id}`)