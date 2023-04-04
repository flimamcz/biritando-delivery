import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestPost = async (endpoint, body, headers) => {
  const { data } = await api.post(endpoint, body, headers);
  return data;
};

export const requestGet = async (endpoint, body) => {
  const { data } = await api.get(endpoint, body);
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export default api;
