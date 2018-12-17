import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.status == 401) {
    Auth.logout();
  }
});

export const Auth = {
  authenticated() {
    return !!localStorage.getItem('mstore-tokenid');
  },
  login({email, password}) {
    return axios.post(`http://localhost:8081/login`, {email, password})
      .then((res) => {
        let {token, user} = res.data;
        localStorage.setItem('profile', JSON.stringify(user));
        localStorage.setItem('token', token);
        axios.interceptors.request.use((config) => {
          config.headers['authorization'] = `Bearer ${token}`;
          return config;
        });
      });
  },
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    axios.interceptors.request.use((config) => {
      delete config.headers['authorization'];
      return config;
    });
    window.location = '/#/login';
  }
};
/*import api from './api';

class authService {

    validarToken = async (token) => {
        console.log(token);
        const data = await api.post("/customers/refresh-token", token);
        console.log(data);
        return data;
    }

    validarToken2 = async (token) => {
        console.log(token);
        const data = await api.post("/customers/refresh-token", token);
        console.log(data);
        return data;
    }
}*/