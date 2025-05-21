import { getDbConnection } from './db';

export async function handleSubscriptionActivated(subscription: any) {
  console.log('Subscription activated:', subscription);
  const customerId = subscription?.customer_id;
  const planId = subscription?.plan_id;
  const email = subscription.notes?.userEmail || ''; // Ensure email is collected earlier
 
  const fullName = subscription.notes?.name || '';

  if (email && planId) {
    console.log('Creating/updating user in DB');
    await createOrUpdateUser({
      email,
      fullName,
      customerId,
      planId,
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
  status,
}: {
  email: string;
  fullName: string;
  customerId: string;
  planId: string;
  status: string;
}) {
  try {
    const sql = await getDbConnection();
    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
    console.log('User found:', user);
    if (user.length === 0) {
      console.log('Creating new user');
      await sql`INSERT INTO users (email, full_name, customer_id, plan_id, status)
                VALUES (${email}, ${fullName}, ${customerId}, ${planId}, ${status})`;
                console.log('User created');
    } else {
      console.log('Updating existing user');
      await sql`UPDATE users SET status = ${status}, plan_id = ${planId} WHERE email = ${email}`;
      console.log('User updated');
    }
  } catch (error) {
    console.error('Error creating/updating user', error);
  }
}

export async function handlePaymentSuccess(payment: any) {
  const id = payment.id;
  let amount = payment.amount;
  amount = amount / 100; // Convert to original amount
  const status = payment.status;
  

}