import Image from 'next/image';
import Link from 'next/link';
import { Star, AlertCircle } from 'lucide-react';

// Fetch data on the server (SEO Friendly)
async function getProducts() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.error('API returned:', res.status);
      return null;
    }
    
    const text = await res.text();
    return JSON.parse(text);
  } catch (e) {
    console.error('Failed to fetch products:', e);
    return null;
  }
}

export default async function Home() {
  const products = await getProducts();

  if (!products) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Products</h2>
        <p className="text-gray-500">Please check your internet connection and try again later.</p>
      </div>
    );
  }

  return (
    <div className='bg-:#b8a5a5'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Latest Arrivals</h1>
        <p className="text-gray-500">Handpicked essentials for you</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="group bg-white border-amber-500 border rounded-xl p-4 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative h-48 w-full mb-4 bg-white overflow-hidden flex items-center justify-center">
              {/* Optimization: Next/Image for performance */}
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain group-hover:scale-110 transition duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">{product.category}</p>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 leading-snug">{product.title}</h3>

                <div className="flex items-center gap-1 mb-2">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-400 ml-1">({product.rating.rate})</span>
                </div>
              </div>
              <p className="text-lg font-bold text-blue-600 mt-2">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
