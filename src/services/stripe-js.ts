/**
 * @fileoverview SDK de Integração do Stripe com o Browser, o front-end
 * @description @stripe/stripe-js
 */

import { loadStripe } from '@stripe/stripe-js';

// Chave publica para ser acessada no meu browser
export async function getStripeJs() {
  const stripeJs = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_API_PUBLIC_KEY
  );

  return stripeJs;
}
