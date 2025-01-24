
import { FaCalendar, FaEnvelope, FaList, FaUserAlt } from 'react-icons/fa';
import { GiWallet } from 'react-icons/gi';
import { IoMdCart } from 'react-icons/io';
import { IoHome, IoMenu } from 'react-icons/io5';
import { MdFastfood, MdReviews } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';

const DashBoard = () => {
    const [cart] = useCart();
    
    
    // TODO: get isAdmin from backEnd;
    const [isAdmin] = useAdmin();
    console.log(isAdmin);
    return (
        <div className='flex'>
            <div className='w-64 min-h-screen bg-orange-400'>
                <ul className='menu gap-2'>
                    {
                        isAdmin ?
                            <>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/adminHome'}>
                                        <IoHome />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/addItems'}>
                                    <MdFastfood />
                                        Add Items
                                    </NavLink>
                                </li>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/manageItems'}>
                                    <FaList />
                                        Manage Items
                                    </NavLink>
                                </li>
                                
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/manageBooks'}>
                                        <MdReviews />
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/allUsers'}>
                                    <FaUserAlt />
                                        All users
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/userHome'}>
                                        <IoHome />
                                        User Home
                                    </NavLink>
                                </li>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/reservation'}>
                                        <FaCalendar></FaCalendar>
                                        Reservation
                                    </NavLink>
                                </li>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/payment'}>
                                        <GiWallet />
                                        Payment History
                                    </NavLink>
                                </li>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/cart'}>
                                        <IoMdCart />
                                        My cart ( {cart.length} )
                                    </NavLink>
                                </li>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/review'}>
                                        <MdReviews />
                                        Add Review
                                    </NavLink>
                                </li>
                                <li className='mx-3 rounded-md text-center'>
                                    <NavLink to={'/dashboard/paymentHistory'}>
                                        <SlCalender />
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                    }
                    <div className='divider'></div>
                    <li className='mx-3 rounded-md text-center'>
                        <NavLink to={'/'}>
                            <IoHome />
                            Home
                        </NavLink>
                    </li>
                    <li className='mx-3 rounded-md text-center'>
                        <NavLink to={'/'}>
                            <IoMenu />
                            Menu
                        </NavLink>
                    </li>
                    <li className='mx-3 rounded-md text-center'>
                        <NavLink to={'/'}>
                            <FaEnvelope />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;