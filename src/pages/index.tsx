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
  async function handleSum() {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    const math = (await import('../lib/math')).default;

    alert(math.sum(2, 5));
  }

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

      <button onClick={handleSum}>Sum</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recomendedProducts = await res.json();

  return {
    props: {
      recomendedProducts
    }
  }
}
