import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from '../../components/ui/button';
import GlobalApi from '../_utils/GlobalApi';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import { toast } from 'sonner';
import Link from 'next/link';


function Cart({ cart }) {
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    const CaculateCartAmount = () => {
        let total = 0;
        cart.forEach((item) => {
            total = total + item.price;
        })
        return total.toFixed(2);
    }
    setUpdateCart(true)
    const RemoveItemFromCart = (id) => {
        setUpdateCart(true)
        GlobalApi.DisconnectRestroFromUserCartItem(id).then(resp => {
            if (resp) {
                GlobalApi.DeleteItemFromCart(id).then(resp => {
                    console.log("AQUI TOY");
                    console.log(resp);
                    toast('Item Removed!');
                    setUpdateCart(!updateCart);
                })
            }
        })
    }
    return (
        <div className='text-lg font-bold'>
            <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>
            <div className='mt-5 flex flex-col gap-3'>
                <h2 className='font-bold'>My Order</h2>
                {cart && cart.map((item, index) => (
                    <div className='flex justify-between gap-8 items-center'
                        key={index}>
                        <div className='flex gap-2 items-center'>

                            <Image
                                alt={item.productName}
                                src={item.productImage}
                                width={40}
                                height={40}
                                className=' h-[40px] w-[40px] rounded-lg object-cover'
                            />
                            <h2 className='text-sm'>{item?.productName}</h2>
                        </div>
                        <h2 className='font-bold flex gap-2'>${item.price}
                            <X className='h-4 w-4 text-red-500 cursor-pointer'
                                onClick={() => RemoveItemFromCart(item.id)} />
                        </h2>
                    </div>
                ))}
                <Link className='w-full' href={'/checkout?restaurant='+cart[0]?.restaurant?.name}>
                    <Button className='w-full'>Checkout ${CaculateCartAmount()}</Button>
                </Link>
            </div>
        </div>
    )
}

export default Cart