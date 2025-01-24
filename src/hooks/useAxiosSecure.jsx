import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: "https://bistro-boss-server-with-menu-and-order-alpha.vercel.app"

})
const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(function (config) {
        console.log('stopped by interceptor')
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        
        return response;
    }, async(error)=> {
          
        const status = error.response.status;
        
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login')
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      });

    return axiosSecure;
};

export default useAxiosSecure;