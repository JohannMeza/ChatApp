import axios from './axios';

export const indexContacts = async () => 
  await axios.get('/contacts')

export const showContacts = async (id) => 
  await axios.get(`/contacts/${id}`)