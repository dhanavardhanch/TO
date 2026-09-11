import { notFound } from 'next/navigation';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import ProductDetailClient from '../../../components/ProductDetailClient';
import { getProductById, PRODUCTS_MASTER } from '../../../data/productsData';

export async function generateStaticParams() {
  return PRODUCTS_MASTER.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found | The Original',
    };
  }

  return {
    title: `${product.name} (${product.grade}) | The Original Palasa Cashews`,
    description: `${product.tagline} — ${product.desc} Sourced directly from coastal Palasa, Andhra Pradesh. Free delivery on orders above ₹999.`,
    openGraph: {
      title: `${product.name} | The Original Palasa Cashews`,
      description: product.desc,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main>
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  );
}
