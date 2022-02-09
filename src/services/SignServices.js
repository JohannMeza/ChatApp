import axios from './axios';

export const access = async () => 
  await axios.get('user/access')

export const signIn = async(body) => 
  await axios.post('user/login', body)
  
export const signUp = async (body) =>
  await axios.post('user/register', body) 