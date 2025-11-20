import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import AddToCartProduct from '@/components/AddToCartProduct';

// Fetch data on the server (SEO Friendly)
async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    // Optimization: Cache data for 1 hour to speed up Vercel response
    next: { revalidate: 3600 }
  });
  if (!res.ok) return null;
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Invalid JSON from API:', text);
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return (
      <div className="animate-fade-in">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 font-medium transition"
        >
          <ArrowLeft size={20} /> Back to Products
        </Link>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500">Sorry, we couldn't load this product. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 font-medium transition"
      >
        <ArrowLeft size={20} /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 bg-white p-6 md:p-10 rounded-2xl shadow-sm border ">
        <div className="h-80 md:h-96 flex items-center justify-center bg-white p-4 rounded-xl relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                <Star size={18} className="fill-current" />
                <span className="text-black font-bold ml-2">{product.rating.rate}</span>
              </div>
              <span className="text-sm text-gray-500 font-medium">({product.rating.count} reviews)</span>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{product.description}</p>
          </div>

          <div className="border-t pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {/* Client Component for Interaction */}
            <AddToCartProduct product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
