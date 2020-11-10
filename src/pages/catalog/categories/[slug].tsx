import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}


export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  return (
    <div>
    <h1>{router.query.slug}</h1>

      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
              {product.title}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

// Quando a página é dinâmica e quero gerar estática também:
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:3001/categories`);
  const categories = await res.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params;

  const res = await fetch(`http://localhost:3001/products?category_id=${slug}`);
  const products = await res.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}
