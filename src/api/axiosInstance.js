import axios from "axios";

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers :{
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const setupAxiosInterceptors = (navigate) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                const status = error.response.status
                switch (status){
                    case 400:
                        console.error("400 bad request")
                        break
                    case 401:
                        localStorage.removeItem("token")
                        navigate("/login", { replace: true })
                        break
                    case 403:
                        console.error("403 Forbidden")
                        navigate("/access-denied", { replace: true })
                        break
                    case 404:
                        console.error("404 not found")
                        navigate("/404", { replace: true })
                        break
                    case 500:
                        console.error("500 server error")
                        break
                }
            } else if(error.request){
                console.error("server error")
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;