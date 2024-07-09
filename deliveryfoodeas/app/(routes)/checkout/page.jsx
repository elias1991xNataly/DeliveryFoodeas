"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useContext } from 'react';
import { Input } from "../../../components/ui/input";
import { Button } from '../../../components/ui/button';
import { CartUpdateContext } from "../../_context/CartUpdateContext";
import { useUser } from '@clerk/nextjs';
import GlobalApi from "../../_utils/GlobalApi";
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryAmount, setDeliveryAmount] = useState(5);
  const [taxAmount, setTaxAmount] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  useEffect(() => {
    console.log(params.get('restaurant'));
    user && GetUserCart();
  }, [user || updateCart])

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(resp => {


      setCart(resp?.userCarts);
      calculateTotalAmount(resp?.userCarts);
    })
  }
  const calculateTotalAmount = (cart_) => {
    let total = 0;
    cart_.forEach(item => {
      total = total + item.price
    })
    setSubTotal(total.toFixed(2));
    setTaxAmount(total * 0.09);
    setTotal(total + total * 0.09 + deliveryAmount)
  }

  const addToOrder = () => {
    setLoading(true)
    const data = {
      email: user?.primaryEmailAddress.emailAddress,
      orderAmount: total,
      restaurantName: params.get('restaurant'),
      userName: user?.fullName,
      phone: phone,
      address: address,
      zipCode: zip
    }
    GlobalApi.CreateNewOrder(data).then(resp => {
      console.log(resp?.createOrder?.id);
      const resultId = resp?.createOrder?.id;
      if (resultId) {

        cart.forEach((item) => {
          GlobalApi.UpdateOrderToAddOrderItem(item.productName, item.price, resultId, user?.primaryEmailAddress.emailAddress).then(result => {
            console.log(result)
            setLoading(false)
            toast('Order Created Successfully!')
            setUpdateCart(!updateCart)

          },(error)=>{
            setLoading(false)
          }
          )
        }
        )
      }
    }, (error) => {
      setLoading(false)
    }
    )
  }

    ;
  return (
    <div className=''>
      <h2 className='font-bold text-2xl my-5'>Checkout</h2>
      <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
        <div className='md:col-span-2 mx-20'>
          <h2 className='font-bold text-3xl'>Billing Details</h2>
          <div className='grid grid-cols-2 gap-10 mt-3'>
            <Input placeholder='Name' onChange={(e) => setUsername(e.target.value)}></Input>
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)}></Input>
          </div>
          <div className='grid grid-cols-2 gap-10 mt-3'>
            <Input placeholder='Phone' onChange={(e) => setPhone(e.target.value)}></Input>
            <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)}></Input>
          </div>
          <div className='mt-3'>
            <Input placeholder='Address' onChange={(e) => setAddress(e.target.value)}></Input>
          </div>
        </div>
        <div className='mx-10 border'>
          <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({cart?.length})</h2>
          <div className='p-4 flex flex-col gap-4'>
            <h2 className='font-bold flex justify-between'>Subtotal:<span>{subTotal} €</span></h2>
            <hr></hr>
            <h2 className='flex justify-between'>Delivery :<span>{deliveryAmount} €</span></h2>
            <h2 className='flex justify-between'>Tax (9%) :<span>{taxAmount.toFixed(2)} €</span></h2>
            <hr></hr>
            <h2 className='font-bold flex justify-between'>Total :<span>{total.toFixed(2)} €</span> </h2>
            {/* <Button onClick={() => onApprove({ paymentId: 123 })}>Pagar</Button> */}
            <Button onClick={() => addToOrder()}>
              {loading ? <Loader className='animate-spin' /> : 'Make Payment'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout