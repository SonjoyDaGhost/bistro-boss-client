import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from '../../../hooks/useCart';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const[transationId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [cart, refetch] = useCart();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const totalPrice = cart.reduce((total, item)=>total + item.price,0)
    
    
    useEffect(()=>{
        if(totalPrice>0){

            axiosSecure.post('/createPaymentIntent', {price: totalPrice})
            .then(res=>{
                console.log('from checkout useEffect', res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
        }
    },[axiosSecure, totalPrice])
    const handleSubmit = async(event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return ;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error);
            setErr(error?.code);
        } else{
            console.log('payment method', paymentMethod);
            setErr('');
        }
        // confirm payment
        const{paymentIntent, error: confirmError}= await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details:{
                    email: user?.email || 'anonymous',
                    name: user?.displayName || "anonymous"
                }
            }
        })
        if(confirmError){
            console.log('confirm error', confirmError)
        } else{
            console.log('payment Intent', paymentIntent);


            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js
                    cartIds: cart.map(item=>item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();
                if (res?.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successful",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/paymentHistory');
                }
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
            disabled={!stripe || !clientSecret}
            className="btn btn-sm btn-primary my-4" type="submit">
                Pay
            </button>
            </form>
            <p className="text-red-600">{err}</p> 
            {
                transationId && <p>Your transation Id: {transationId}</p>
            }   
        </div>
    );
};

export default CheckOutForm;