import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user.email);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    
                                    console.log('user profile updated')
                                    Swal.fire({
                                        title: "Login Successful",
                                        text: "Click ok to continue",
                                        icon: "success"
                                    }).then(result => {
                                        if (result.isConfirmed) {
                                            navigate('/');
                                        }
                                    })
                                }
                            })

                    })
                
            })
            .catch(error=>{
                console.log(error.code);
                Swal.fire({
                    title: "Email address is already in use!",
                    text: "Please try another email",
                    icon: "error"
                })
            })
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  {...register("name", { required: true })} name="name" placeholder="Enter your Name" className="input input-bordered" />
                            {errors.name && <span className="ml-2 text-red-600 mt-2">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="ml-2 text-red-600 mt-2">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                                maxLength: 20,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
                            })} name="password" placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <span className="ml-2 text-red-600 mt-2">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="ml-2 text-red-600 mt-2">Password Must be at least 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span className="ml-2 text-red-600 mt-2">Password Must be less than 21 characters</span>}
                            {errors.password?.type === 'pattern' && <span className="ml-2 text-red-600 mt-2">Password Must have one uppercase, one lower case, one number and one following charcter (@$!%*?&)</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <p className='text-center pb-6 text-amber-600'>Already have an account? <span className='font-bold'><Link to={'/login'}>Log In</Link></span></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignUp;