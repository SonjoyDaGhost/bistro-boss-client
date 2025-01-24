import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const img_key = import.meta.env.VITE_IMG_KEY;
const img_api = `https://api.imgbb.com/1/upload?key=${img_key}`

const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        console.log(data)
        const res = await axiosPublic.post(img_api, imageFile, {
            headers: {

                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const menuInfo = {
                name: data.name,
                price: parseFloat(data.price),
                category: data.category,
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuInfo)

            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });

            }


        }
        console.log(res.data);

    }
    return (
        <div>
            <SectionTitle heading={'Add an item'} subHeading={"what's new"}></SectionTitle>
            <div >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">What is your recipe name?</span>

                            </div>
                            <input {...register('name')} type="text" placeholder="Type here" className="input input-bordered w-full " />

                        </label>
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="w-full">


                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">What is your name?</span>

                                </div>
                                <select {...register("category")} className="select select-bordered w-full ">
                                    <option disabled selected>Select Category?</option>
                                    <option value="salad">Salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="soup">Soup</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>

                                </select>

                            </label>
                        </div>
                        {/* price */}
                        <div className="w-full">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">What is Price?</span>

                                </div>
                                <input {...register('price')} type="text" placeholder="Enter Price" className="input input-bordered w-full " />

                            </label>
                        </div>

                    </div>
                    {/* recipe details */}
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Recipe Details</span>
                            </div>
                            <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Recipe details"></textarea>

                        </label>

                    </div>
                    {/* file input  */}
                    <div>

                        <input {...register('image')} type="file" className="file-input w-full max-w-xs" />

                    </div>





                    <button className="btn">ADD ITEMS <FaUtensils className="ml-3"></FaUtensils></button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;