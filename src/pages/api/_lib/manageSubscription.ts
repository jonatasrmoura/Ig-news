import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

// Salvar essas informação no banco de dados(informações do parametro)
export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  // Buscar o usuário no banco do FaunaDB com o ID (add novas collections)

  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Salvar os dados da subscription no FaunaDB

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )
}
