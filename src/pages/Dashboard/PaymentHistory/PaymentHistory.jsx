import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

import useAxiosSecure from "../../../hooks/useAxiosSecure";



const PaymentHistory = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            console.log(res.data);
            return res.data;
        }
    })
    return (
        <div>
            <div>
                <h3>Total Payment: {payments.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Price</th>
                                <th>Transaction Id</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((item, idx) => <tr key={item._id} className="bg-base-200">
                                    <th>{idx + 1}</th>
                                    <td>{item.price}</td>
                                    <td>{item.transactionId}</td>
                                    <td>{item.status}</td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;