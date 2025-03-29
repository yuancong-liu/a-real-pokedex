import { BASE_URL } from './getPokeApiPathname';

import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
