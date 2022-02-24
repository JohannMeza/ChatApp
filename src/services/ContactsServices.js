import axios from './axios';

export const indexContacts = async () => 
  await axios.get('/contacts')

export const showContacts = async (id) => 
  await axios.get(`/contacts/${id}`)

export const showOnlyContacts = async (id) =>
  await axios.get(`/contacts/only-contacts/${id}`)

export const storeContacts = async (body) => 
  await axios.post(`/contacts`, body)

export const updateContacts = async (id, body) =>
  await axios.put(`/contacts/${id}`, body)