/*import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.status == 401) {
    api.logout();
  }
});

export const api = {
  authenticated() {
    return !!localStorage.getItem('mstore-tokenid');
  },
  login({email, password}) {
    return axios.post(`https://api-store.herokuapp.com/customers/authenticate`, {email, password})
      .then((res) => {
        let {token, data} = res.data;
        localStorage.setItem('profile', JSON.stringify(data));
        localStorage.setItem('mstore-tokenid', token);
        axios.interceptors.request.use((config) => {
          config.headers['authorization'] = `Bearer ${token}`;
          return config;
        });
      });
  },
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('mstore-tokenid');
    axios.interceptors.request.use((config) => {
      delete config.headers['authorization'];
      return config;
    });
    window.location = '/login';
  }
};*/
import axios from "axios";

const api = axios.create({ 
    baseURL: "https://api-store.herokuapp.com" 
});

api.postOrPut = (url, id, data, config = {}) => {
  const method = id ? 'put' : 'post';
  const apiUrl = id ? `${url}/${id}` : url;

  return api[method](apiUrl, data, config);
}

export default api;