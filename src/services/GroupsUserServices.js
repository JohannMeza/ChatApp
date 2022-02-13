import axios from './axios';

export const showGroupsUser = async (id) => 
  await axios.get(`/groupUser/${id}`)