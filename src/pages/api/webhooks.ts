import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(
      typeof chunks === "string" ? Buffer.from(chunk) : chunk
    );
  }

  return Buffer.concat(chunks);
}

// Para o Nextjs entender que isso é um stream, e não um JSON por exemplo
export const config = {
  api: {
    bodyParser: false,
  },
};

//Quais eventos são relevantes(quais eu quero ouvir, e quais eventos eu quero que minha aplicação não ouça)
const relevantEvents = new Set([
  'checkout.session.completed'
]);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf, secret, process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook error ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'checkout.session.completed':

          const checkoutSession = event.data.object as Stripe.Checkout.Session; 

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString()
            );

            break;
          default:
            throw new Error('Unhandled event.')
        }
      } catch (err) {
        return res.json({ error: 'Webhook handler failed.' });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
