# Stripe Payment Integration Setup

This document outlines the setup process for Stripe payment integration in PrismUI.

## Environment Variables

Add these variables to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # or sk_live_... for production
STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_... for production  
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (created in Stripe Dashboard)
STRIPE_INDIVIDUAL_LIFETIME_PRICE_ID=price_...
STRIPE_INDIVIDUAL_PREMIUM_PRICE_ID=price_...

# Application URL (for success/cancel redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000 # or your production URL
```

## Stripe Dashboard Setup

### 1. Create Products

1. Go to [Stripe Dashboard > Products](https://dashboard.stripe.com/products)
2. Click "Add product"

**Individual License - Premium Access:**
- Name: `PrismUI Individual License - Premium Access`
- Description: `Lifetime access to PrismUI premium components and features`
- Image: Upload your product image
- Pricing: One-time payment of $149 USD
- Save the **Price ID** for `STRIPE_INDIVIDUAL_PREMIUM_PRICE_ID`

**Individual License - Lifetime Access:**
- Name: `PrismUI Individual License - Lifetime Access`
- Description: `Complete lifetime access to all PrismUI components with premium features`
- Image: Upload your product image  
- Pricing: One-time payment of $199 USD
- Save the **Price ID** for `STRIPE_INDIVIDUAL_LIFETIME_PRICE_ID`

### 2. Configure Webhooks

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set endpoint URL: `https://yourapp.com/api/payments/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Save the **Webhook Secret** for `STRIPE_WEBHOOK_SECRET`

### 3. API Keys

1. Go to [Stripe Dashboard > API Keys](https://dashboard.stripe.com/apikeys)
2. Copy the **Publishable key** for `STRIPE_PUBLISHABLE_KEY`
3. Copy the **Secret key** for `STRIPE_SECRET_KEY`

⚠️ **Important:** Use test keys during development and live keys in production.

## Database Schema Requirements

Ensure your database includes these fields in the `User` model:

```sql
-- User table should have:
membership VARCHAR(20) DEFAULT 'FREE' -- 'FREE', 'PRO', 'ENTERPRISE'
stripeCustomerId VARCHAR(255)

-- Payment history table (optional but recommended):
CREATE TABLE payment_history (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_payment_intent_id VARCHAR(255),
  amount INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL,
  plan_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Testing

### Test Card Numbers

Use these test card numbers in Stripe test mode:

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires Authentication:** `4000 0025 0000 3155`

Any future expiry date and CVC will work.

### Webhook Testing

1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/payments/webhook`
4. Copy the webhook secret from CLI output to `STRIPE_WEBHOOK_SECRET`

## Tax Configuration (Optional)

For production, you may want to enable automatic tax calculation:

1. Go to [Stripe Dashboard > Tax Settings](https://dashboard.stripe.com/settings/tax)
2. Add your business address
3. Enable automatic tax collection
4. Update checkout session to include: `automatic_tax: { enabled: true }`

**Note:** Automatic tax is currently disabled in the checkout to avoid setup requirements during development.

## Production Checklist

- [ ] Switch to live API keys
- [ ] Update webhook endpoint to production URL
- [ ] Configure production environment variables
- [ ] Test payment flow end-to-end
- [ ] Set up monitoring for failed payments
- [ ] Configure tax calculation if needed
- [ ] Test webhook delivery and retry logic

## Troubleshooting

### Common Issues

1. **Webhook signature verification failed**
   - Check `STRIPE_WEBHOOK_SECRET` matches your webhook endpoint
   - Ensure raw request body is passed to webhook verification

2. **Price ID not found**
   - Verify `STRIPE_INDIVIDUAL_LIFETIME_PRICE_ID` and `STRIPE_INDIVIDUAL_PREMIUM_PRICE_ID` 
   - Ensure price IDs are from the correct Stripe account (test vs live)

3. **User not upgraded after payment**
   - Check webhook is receiving events
   - Verify user ID in session metadata
   - Check database connection in webhook handler

### Logs to Monitor

- Checkout session creation errors
- Webhook processing failures  
- Database update errors
- User membership upgrade issues

## Support

For Stripe-specific issues, refer to:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)
- [Better Auth Stripe Plugin](https://www.better-auth.com/docs/plugins/stripe)