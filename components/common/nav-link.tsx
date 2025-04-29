'use client'
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
export const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
    const pathname = usePathname();
    const isactive = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "text-gray-900 hover:text-gray-600 transition-all duration-300 ease-in-out transition-colours",
        className,
        isactive && "text-rose-600"
      )}
    >
      {children}
    </Link>
  );
};
