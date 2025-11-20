'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromCart, updateQuantity } from '@/redux/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        <Link 
          href="/" 
          className="inline-block mt-6 text-blue-600 font-semibold hover:underline"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="relative w-24 h-24 flex-shrink-0 bg-white rounded-md border overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">{item.title}</h3>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center bg-gray-50 rounded-lg border">
                    <button 
                       onClick={() => dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1}))}
                       className="p-2 hover:bg-gray-200 rounded-l-lg transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                    <button 
                       onClick={() => dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1}))}
                       className="p-2 hover:bg-gray-200 rounded-r-lg transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm text-gray-600 pb-4 border-b">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg active:scale-95"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
}