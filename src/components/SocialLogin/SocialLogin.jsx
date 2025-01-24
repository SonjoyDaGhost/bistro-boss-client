
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';


const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();
    const {googleSignIn} = useAuth();
    const handleGoogleLogin = ()=> {
        googleSignIn()
        .then(result=>{
            console.log(result.user);
            const userInfo ={
                name: result.user?.displayName,
                email: result.user?.email,
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data);
            })
            navigate(from);
        })
    }
    return (
        <div className='p-8'>
            <button onClick={handleGoogleLogin} className="btn btn-active btn-accent"><FaGoogle className='mr-3'></FaGoogle>Login with Google</button>
        </div>
    );
};

export default SocialLogin;