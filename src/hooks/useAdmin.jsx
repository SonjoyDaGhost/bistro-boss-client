import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();
   const {data: isAdmin, isPending: isAdminLoading} = useQuery({
    enabled: !loading,
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async()=> {
        const res = await axiosSecure.get(`/users/admin/${user?.email}`)
        return res.data?.isAdmin;
    }
   })
   return[isAdmin, isAdminLoading];
};

export default useAdmin;