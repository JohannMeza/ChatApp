import axios from './axios';

export const indexMessages = async () => 
  await axios.get('/')

export const showMessage = async (id) => 
  await axios.get(`/${id}`)

export const storeMessages = async (body) =>
  await axios.post('/message', body)

export const updateViewed = async (body) =>
  await axios.post('/message/viewed', body)

export const showMessageUserByUser = async (body) =>
  await axios.post('/message/user', body)