import { useEffect, useState } from 'react';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}
export default function Home() {
  const [recomendedProducts, setRecomendedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/recommended').then(res => {
      res.json().then(data => {
        setRecomendedProducts(data);
      })
    })
  }, []);

  return (
    <div>
      <Title>Estou vivo!</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {recomendedProducts.map(recomendedProduct => {
            return (
              <li key={recomendedProduct.id}>
                {recomendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
