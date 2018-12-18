import axios from 'axios';
import api from './api';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.status === 401) {
    console.log("Erro status 401, fazendo logout...");
    this.logout();
  }
});

export function authenticated() {
    return !!localStorage.getItem('mstore-tokenid');
}

export function  login({email, password}) {
    return api.post(`/customers/authenticate`, {email, password})
      .then((res) => {
        let {token, data} = res.data;
        localStorage.setItem('profile', JSON.stringify(data));
        localStorage.setItem('mstore-tokenid', token);
        axios.interceptors.request.use((config) => {
          config.headers['authorization'] = `Bearer ${token}`;
          return config;
        });
    });
  }
  export function  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('mstore-tokenid');
    axios.interceptors.request.use((config) => {
      delete config.headers['authorization'];
      return config;
    });
    //window.location = '/#/login';
}

export function  validarToken() {
    console.log("Validando token...");
    const token = localStorage.getItem('mstore-tokenid');
    return api.post(`/customers/refresh-token`, {token: token})
    .then((res) => {
      console.log("Token válido!");
        console.info(res.data.data);    
        return res.data;
    }).catch((error) => {
        console.warn(error.response.data);
        return undefined;
        //window.location = '/login';
    });
  }
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