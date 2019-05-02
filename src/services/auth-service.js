import axios from 'axios';
import api from './api';

axios.interceptors.response.use((response) => {
    console.log("...interceptor...");
    console.log(response);
    console.log("...interceptor...");
    
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
    console.log("Fazendo login...");
    return api.post(`/customers/authenticate`, {email, password})
    .then((res) => {
        console.log("Logado!");
        let {token, data} = res.data;
        localStorage.setItem('profile', JSON.stringify(data));
        localStorage.setItem('mstore-tokenid', token);
        return res;
        /*api.interceptors.request.use((config) => {
            config.headers['authorization'] = `Bearer ${token}`;
            return config;
        });*/
    }).catch((error) => {
        console.log("Falha ao fazer login!");
        return error.response.data;
    });
  }

export function  logout() {
    console.log("Fazendo logout...");
    localStorage.removeItem('profile');
    localStorage.removeItem('mstore-tokenid');
    axios.interceptors.request.use((config) => {
      delete config.headers['authorization'];
      return config;
    });
    window.location = '/login';
}

export function  validarToken() {
    console.log("Validando token...");
    const token = localStorage.getItem('mstore-tokenid');
    return api.post(`/customers/refresh-token`, {token: token})
    .then((res) => {
        console.log("Token válido!");
        return res.data;
    }).catch((error) => {
        if(error.response) {
            console.warn(error.response.data);
        } else {
            console.warn(error);            
        }
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