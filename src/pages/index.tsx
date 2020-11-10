import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Prismic from "prismic-javascript";
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

import SEO from '~/components/SEO';
import { client } from '~/lib/prismic';
import { Title } from '~/styles/pages/Home';

interface HomeProps {
  recomendedProducts: Document[];
}
export default function Home({ recomendedProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        image="image/boost.png"
        shouldExcludeTitleSuffix
      />
      <Title>Estou vivo!</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {recomendedProducts.map(recomendedProduct => {
            return (
              <li key={recomendedProduct.id}>
                <Link href={`/catalog/products/${recomendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recomendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recomendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ]);

  // console.log(recomendedProducts.results[0].data);

  return {
    props: {
      recomendedProducts: recomendedProducts.results,
    }
  }
}
