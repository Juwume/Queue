import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

$authHost.interceptors.request.use(
    function(config) {
      
        const token = localStorage.getItem('token');
        if (token) 
            config.headers.authorization = 'Bearer ' + token;
        return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

export {
    $host,
    $authHost
}