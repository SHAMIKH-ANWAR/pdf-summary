import { UpgradeRequired } from "@/components/common/upgrade-required";
import { getSubscriptionStatus } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const hasActiveSubscription = ({
    user
  });

  if (!hasActiveSubscription) {
    return <UpgradeRequired />;
  }

  return <>{children}</>;
}