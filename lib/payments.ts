import { currentUser } from "@clerk/nextjs/server";
import { getDbConnection } from "./db";

// export async function handleSubscriptionActivated(subscription: any) {
//     const user = await currentUser();
//     console.log('user', user);
//   const userId = user?.id ?? '';
//   const customerId = subscription?.customer_id;
//   const planId = subscription?.plan_id;
//   const email = subscription.notes?.userEmail || ''; // Ensure email is collected earlier

//   const fullName = subscription.notes?.name || '';

//   if (email && planId) {

//     await createOrUpdateUser({
//       email,
//       fullName,
//       customerId,
//       planId,
//       userId,
//       status: 'active',
//     });
//   }
// }

export async function handleSubscriptionCancelled(subscription: any) {
  const customerId = subscription.customer_id;

  const sql = await getDbConnection();
  await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${customerId}`;
}

// async function createOrUpdateUser({
//   email,
//   fullName,
//   customerId,
//   planId,
//   userId,
//   status,
// }: {
//   email: string;
//   fullName: string;
//   customerId: string;
//   userId:string;
//   planId: string;
//   status: string;
// }) {
//   try {
//     const sql = await getDbConnection();
//     const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;

//     if (!user || user.length === 0 ) {

//       await sql`INSERT INTO users (email, full_name, customer_id,clerk_user_id, price_id, status)
//                 VALUES (${email}, ${fullName}, ${customerId},${userId}, ${planId}, ${status})`;

//     } else {

//       await sql`UPDATE users SET status = ${status}, price_id = ${planId} WHERE email = ${email}`;
//       console.log('User updated');
//     }
//   } catch (error) {
//     console.error('Error creating/updating user', error);
//   }
// }

export async function handlePaymentSuccess(payment: any) {
  const id = payment.id;

  let amount: number;

  amount = payment.plan_id === "plan_QX9EV669OhB0L7" ? 20 : 50;

  const status = payment.status || "cancelled";
  const RazorpayCustomerId = payment.customer_id;
  const userEmail = payment.notes?.userEmail || "";
  const priceId = payment.plan_id || "";
  const ClerkUserId = payment.notes?.clerkUserId || "";
  // console.log('ClerkUserId recieved in payments.ts', ClerkUserId);

  const sql = await getDbConnection();

  // console.log("payment.notes", payment?.notes);

  const name = payment?.notes?.name || "";
  // console.log('Name from payment notes:', name);

  const existingUser =
    await sql`SELECT * FROM users WHERE email = ${userEmail}`;

  const paymentStatus = "paid";

  if (!existingUser || existingUser.length === 0) {
    // console.log('Creating new user for payment');
    await sql`INSERT INTO users (email, full_name, customer_id,clerk_user_id, price_id, status)
                VALUES (${userEmail}, ${name}, ${RazorpayCustomerId},${ClerkUserId}, ${priceId}, ${status})`;
  } else {
    // console.log('Updating existing user for payment');
    await sql`UPDATE users SET status = ${status}, price_id = ${priceId}, clerk_user_id = ${ClerkUserId} WHERE email = ${userEmail}`;
  }

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
      ${ClerkUserId},
      ${amount},
      ${paymentStatus},
      ${priceId},
      ${userEmail},
      ${id}
    )
  `;
}

export async function handleSubscriptionCompleted(subscription: any) {
  const customerId = subscription.customer_id;
  // const planId = subscription.plan_id;
  const userEmail = subscription.notes?.userEmail || "";
  // const fullName = subscription.notes?.name || "";
  const ClerkUserId = subscription.notes?.clerkUserId || "";

  const sql = await getDbConnection();

  sql`UPDATE users
SET status = 'completed'
WHERE clerk_user_id = ${ClerkUserId} AND customer_id = ${customerId}`;

  // if (userEmail && planId) {
  //   await createOrUpdateUser({
  //     email: userEmail,
  //     fullName,
  //     customerId,
  //     planId,
  //     userId: ClerkUserId,
  //     status: 'active',
  //   });
  // }
}
