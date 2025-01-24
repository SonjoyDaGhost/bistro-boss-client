import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-server-with-menu-and-order-alpha.vercel.app',
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;