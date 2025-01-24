
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                
                console.log(id);
                axiosSecure.delete(`/carts/${id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                           
        
                        });
                        
                    }
                })
            }
        });

    }
    const totalPrice = cart.reduce((total, item) => { return total + item.price }, 0)
    return (
        <div>
            <div className="flex justify-evenly">
                <h1 className="text-4xl">Items: {cart.length}</h1>
                <h1 className="text-4xl">Items: ${totalPrice}</h1>
                <Link to={'/dashboard/payment'}>
                
                <button className="btn btn-primary">Pay</button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cart.map((item, idx) =>
                                <tr key={item._id}>
                                    <th>
                                        <h5>{idx + 1}</h5>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{item.name}</div>

                                        </div>
                                    </td>
                                    <td>${item.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs">Delete</button>
                                    </th>
                                </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Cart;