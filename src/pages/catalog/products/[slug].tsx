import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// import AddToCartModal from '../../../components/AddToCartModal';
const AddToCartModal = dynamic(
  () => import('~/components/AddToCartModal'),
  {
    loading: () => <p>Loading ..</p>,
    /**
     * ssr: false
     * O componente é sempre renderizado pelo browser.
     */
    ssr: false,
  }
);

export default function Products() {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(true);
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      { isAddToCartModalVisible && <AddToCartModal /> }
    </div>
  );
}
