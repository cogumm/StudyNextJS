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

  // Indica se a página está sendo gerada ou não.
  if (router.isFallback) {
    return <p>Carregando ..</p>
  }

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
    /**
     * fallback: true
     *   Sempre que o primeiro usuário tentar acessar uma rota que ainda não foi gerada estaticamente,
     *   ele vai gerar automaticamente.
     */
    fallback: true,
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

// fallback + revalidate = páginas estáticas "quase" dinâmicas
