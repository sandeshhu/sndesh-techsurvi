'use client';

import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }));
    alert("Added to cart!"); // Simple feedback
  };

  return (
    <button
      onClick={handleAdd}
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-blue-200 transition transform active:scale-95"
    >
      Add to Cart
    </button>
  );
}