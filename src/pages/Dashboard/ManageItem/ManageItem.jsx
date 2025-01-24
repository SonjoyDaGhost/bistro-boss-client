import { ImBin } from "react-icons/im";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const ManageItem = () => {
    
    const axiosSecure = useAxiosSecure();
    const [menu, , refetch] = useMenu();
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


                axiosSecure.delete(`/menu/${id}`)
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
    return (
        <div>
            <h1 className="text-2xl text-center">Manage Items: {menu?.length}</h1>
            <div className="overflow-x-auto ">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>

                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            menu.map((item, idx) => <tr key={item._id}>
                                <th>{idx + 1}</th>
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
                                <td>{item.name}</td>

                                <td>


                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button className="btn btn-ghost" >

                                            <FaEdit className="text-2xl" />
                                        </button>



                                    </Link>




                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost">
                                        <ImBin className="text-2xl text-red-600" />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItem;