import { getDbConnection } from './db';

export async function handleSubscriptionActivated(subscription: any) {
  const customerId = subscription.customer_id;
  const planId = subscription.plan_id;
  const email = subscription.email || ''; // Ensure email is collected earlier
  const fullName = subscription.notes?.name || '';

  if (email && planId) {
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
    if (user.length === 0) {
      await sql`INSERT INTO users (email, full_name, customer_id, plan_id, status)
                VALUES (${email}, ${fullName}, ${customerId}, ${planId}, ${status})`;
    } else {
      await sql`UPDATE users SET status = ${status}, plan_id = ${planId} WHERE email = ${email}`;
    }
  } catch (error) {
    console.error('Error creating/updating user', error);
  }
}
