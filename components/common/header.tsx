"use client"

import Link from "next/link"
import { FileText, Menu } from "lucide-react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import PlanBadge from "./plan-badge"
import { Separator } from "@/components/ui/separator"

type UserPlanData = {
  priceId: string | null
  planName: string
  subscriptionId?: string | null
  status: string | null
} | null

const Header = ({ userPlanData }: { userPlanData: UserPlanData }) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log("Subscriptionn id in Header:", userPlanData?.subscriptionId)
  return (
    <nav className="container flex items-center justify-between py-4 px-2 lg:px-8 mx-auto">
      <div className="flex lg:flex-1">
        <Link href="/" className="font-bold flex items-center gap-1 lg:gap-2">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-rose-600 hover:rotate-12 transform transition-all duration-300 ease-in-out" />
          <span className="text-xl lg:text-2xl text-gray-900">Resumen</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <Link href="/#pricing" className="text-sm lg:text-base hover:text-rose-600 transition-colors">
          Pricing
        </Link>
        <SignedIn>
          <Link href="/dashboard" className="text-sm lg:text-base hover:text-rose-600 transition-colors">
            Your Summaries
          </Link>
        </SignedIn>
      </div>

      {/* Desktop User Actions */}
      <div className="hidden md:flex lg:justify-end gap-4 lg:flex-1 items-center">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <Link href="/upload" className="text-sm lg:text-base hover:text-rose-600 transition-colors">
              Upload a PDF
            </Link>
            {userPlanData && (
              <PlanBadge subscriptionId={userPlanData?.subscriptionId} priceId={userPlanData.priceId} planName={userPlanData.planName} status={userPlanData.status} />
            )}
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className="text-sm lg:text-base hover:text-rose-600 transition-colors">
            Sign in
          </Link>
        </SignedOut>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-md " aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[250px] sm:w-[300px] bg-gradient-to-b from-white to-rose-50 border-l-rose-200"
          >
            <div className="flex flex-col items-center text-center mt-8">
              <div className="w-full flex flex-col items-center py-3">
                <Link
                  href="/#pricing"
                  className="text-lg font-medium text-gray-800 hover:text-rose-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
              </div>

              <Separator className="w-4/5 bg-rose-200/50" />

              <SignedIn>
                <div className="w-full flex flex-col items-center py-3">
                  <Link
                    href="/dashboard"
                    className="text-lg font-medium text-gray-800 hover:text-rose-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Your Summaries
                  </Link>
                </div>

                <Separator className="w-4/5 bg-rose-200/50" />

                <div className="w-full flex flex-col items-center py-3">
                  <Link
                    href="/upload"
                    className="text-lg font-medium text-gray-800 hover:text-rose-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Upload a PDF
                  </Link>
                </div>

                <Separator className="w-4/5 bg-rose-200/50" />

                <div className="flex items-center justify-center gap-2 mt-6 mb-2">
                  {userPlanData && (
                    <PlanBadge
                      priceId={userPlanData.priceId}
                      planName={userPlanData.planName}
                      status={userPlanData.status}
                      subscriptionId={userPlanData.subscriptionId}
                    />
                  )}
                  <UserButton />
                </div>
              </SignedIn>

              <SignedOut>
                <div className="w-full flex flex-col items-center py-3">
                  <Link
                    href="/sign-in"
                    className="text-lg font-medium text-gray-800 hover:text-rose-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </Link>
                </div>
              </SignedOut>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Header
