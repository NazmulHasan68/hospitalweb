import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Fixed_cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <Link to={'/user_panel/order'} className='p-5  bg-sky-500 hover:bg-sky-700 text-white rounded-full relative cursor-pointer'>
      <ShoppingCart size={18}/>
      <div className=' absolute -top-1 right-3 p-2 rounded-full text-white font-bold'>{cartItems?.length}</div>
    </Link>
  )
}
