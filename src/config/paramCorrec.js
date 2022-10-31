import { logout } from './api/Api';

export function logout() {
  return axios.put(endPoint, body, {
      headers: {
        ...Headers,
        ...headers
      }
    });
}