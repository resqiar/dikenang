import axios, { AxiosInstance } from 'axios'

const baseURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000/'
		: process.env.NEXT_PUBLIC_BACKEND_URI

const axiosConfig: AxiosInstance = axios.create({
	baseURL,
	withCredentials: true,
})

export default axiosConfig
