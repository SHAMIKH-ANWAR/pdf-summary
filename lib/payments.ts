import { currentUser } from '@clerk/nextjs/server';
import { getDbConnection } from './db';

export async function handleSubscriptionActivated(subscription: any) {
    const user = await currentUser();
    console.log('user', user);
  const userId = user?.id ?? '';
  const customerId = subscription?.customer_id;
  const planId = subscription?.plan_id;
  const email = subscription.notes?.userEmail || ''; // Ensure email is collected earlier
 
  const fullName = subscription.notes?.name || '';

  if (email && planId) {
    
    await createOrUpdateUser({
      email,
      fullName,
      customerId,
      planId,
      userId,
      status: 'active',
    });
  }
}

export async function handleSubscriptionCancelled(subscription: any) {
  const customerId = subscription.customer_id;

  const sql = await getDbConnection();
  await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${customerId}`;
}

async function createOrUpdateUser({
  email,
  fullName,
  customerId,
  planId,
  userId,
  status,
}: {
  email: string;
  fullName: string;
  customerId: string;
  userId:string;
  planId: string;
  status: string;
}) {
  try {
    const sql = await getDbConnection();
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
   
    if (!user || user.length === 0 ) {
      console.log('Creating new user');
      await sql`INSERT INTO users (email, full_name, customer_id,clerk_user_id, price_id, status)
                VALUES (${email}, ${fullName}, ${customerId},${userId}, ${planId}, ${status})`;
                console.log('User created');
    } else {
      
      await sql`UPDATE users SET status = ${status}, price_id = ${planId} WHERE email = ${email}`;
      console.log('User updated');
    }
  } catch (error) {
    console.error('Error creating/updating user', error);
  }
}

export async function handlePaymentSuccess(payment: any) {
  const id = payment.id;
  let amount = payment.amount;
  amount = amount / 100;

  const status = payment.status || 'paid'; // default fallback
  const userId = payment.customer_id;
  const userEmail = payment.email;
  const priceId = amount === 20
    ? 'plan_QX9EV669OhB0L7'
    : 'plan_QX9HPNX2i0freE';

  const sql = await getDbConnection();

  await sql`
    INSERT INTO payments (
      user_id,
      amount,
      status,
      price_id,
      user_email,
      razorpay_payment_id
    )
    VALUES (
      ${userId},
      ${amount},
      ${status},
      ${priceId},
      ${userEmail},
      ${id}
    )
  `;
}
