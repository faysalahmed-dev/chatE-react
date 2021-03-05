import axios from 'axios';
import ls from '@/utils/localStorage';

const axiosIns = axios.create({
   baseURL: 'http://localhost:4555/api/v1',
   headers: {
      'content-type': 'application/json',
   },
});

axiosIns.interceptors.request.use(
   config => {
      const token = ls.getToken();
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   error => {
      console.log('interceptors ', error);
      return Promise.reject(error);
   }
);

axiosIns.interceptors.response.use(
   config => {
      if (config.data.status === 'success') {
         return config;
      } else {
         throw config;
      }
   },
   error => {
      if (error.response) {
         console.log(error.response);
         return Promise.reject(error.response.data.error.message);
      } else if (error.message === 'Network Error') {
         return Promise.reject('Please Check Your Network Connection');
      } else {
         return Promise.reject('Some thing went wrong..');
      }
   }
);

export default axiosIns;
