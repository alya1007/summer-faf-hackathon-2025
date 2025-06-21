import axios, {
	AxiosError,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import { type ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const AxiosInterceptorWrapper = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();

	const [interceptorsSet, setInterceptorsSet] = useState(false);

	useEffect(() => {
		const requestInterceptor = (config: InternalAxiosRequestConfig) => {
			const token = localStorage.getItem("access-token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		};

		const responseInterceptor = (response: AxiosResponse) => {
			return response;
		};

		const errorInterceptor = (error: AxiosError) => {
			if (error.response && error.response.status === 401) {
				navigate("/");
			}
			return Promise.reject(error);
		};

		const reqInterceptor = api.interceptors.request.use(
			requestInterceptor,
			(error) => Promise.reject(error)
		);

		const resInterceptor = api.interceptors.response.use(
			responseInterceptor,
			errorInterceptor
		);

		setInterceptorsSet(true);

		return () => {
			api.interceptors.request.eject(reqInterceptor);
			api.interceptors.response.eject(resInterceptor);
		};
	}, [navigate]);

	return interceptorsSet && children;
};

export default api;
export { AxiosInterceptorWrapper };
