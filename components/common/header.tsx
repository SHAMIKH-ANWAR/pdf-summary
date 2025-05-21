import Link from "next/link";
import { FileText } from "lucide-react";
// import { Button } from "../ui/button";
import { NavLink } from "./nav-link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import PlanBadge from "./plan-badge";
const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <Link href="/" className=" font-bold flex items-center gap-1 lg:gap-2">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition-all duration-300 ease-in-out" />{" "}
          <span className="text-xl lg:text-2xl text-gray-900">Resumen</span>
        </Link>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <Link href="/#pricing">Pricing</Link>
        {
          <SignedIn>
            {" "}
            <Link href="/dashboard">Your Summaries</Link>
          </SignedIn>
        }
      </div>
      <div className="flex lg:justify-end gap-4  lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <Link href="/upload">Upload a PDF</Link>
            <div>
              <PlanBadge/>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            {/* <Button variant="outline">Sign out</Button> */}
          </div>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">Sign in</Link>
        </SignedOut>
      </div>
      {/* <div>
            <Link href="/sign-up">Sign up</Link>
        </div> */}
    </nav>
  );
};

export default Header;
