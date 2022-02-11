import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

/*
  3 Formas principais de fazer uma chamada a api

  - Client-side -> Quando não precisa de indexação, informação que é carregada de uma ação do usuário, não
                    necessáriamente quando a página carrega, DEPOIS DA PÁGINA SER CARREGADA.

  - Server-side -> Dados dinâmicos(tempo real) do usuário que está acessando (no contexto da requisição)
  - Static Site Generation -> Bom para CO, página para todo mundo ver
*/

export default function Home({ product }: HomeProps) {
  
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for { product.amount } month</span>
          </p>
          <SubscribeButton
            priceId={product.priceId}
          />
        </section>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KRwXiBJ8v7KihPfuQTY8UV9');

  /* const price = await stripe.prices.retrieve('price_1KRwXiBJ8v7KihPfuQTY8UV9', {
    // parametro para ter todos os acessos do produto
    expand: ['product']
  }); */

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
