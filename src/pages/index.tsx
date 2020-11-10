import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recomendedProducts: IProduct[];
}
export default function Home({ recomendedProducts }: HomeProps) {
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch('http://localhost:3001/recommended');
  const recomendedProducts = await res.json();

  return {
    props: {
      recomendedProducts
    }
  }
}
