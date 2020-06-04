import axios from 'axios';
import  ls from '@/utils/localStorage';

const axiosIns = axios.create({
	baseURL:'http://localhost:4555/api/v1',
	headers: {
		'content-type':"application/json"
	}
})

axiosIns.interceptors.request.use(config => {
	const token = ls.getToken()
	if(token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config;
},	error => {
	console.log('interceptors ', error)
	return Promise.reject(error)
});

axiosIns.interceptors.response.use(config => {
	return config;	
}, error => {
	return Promise.reject(error)
})

export default axiosIns;