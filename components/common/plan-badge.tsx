"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Crown, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PlanBadge({
  priceId = null,
  planName = "Buy a plan",
  subscriptionId,
  status = null,
}: {
  priceId?: string | null
  planName?: string
  subscriptionId?: string | null
  status?: string | null
}) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCancelSubscription = async () => {
    setIsLoading(true)
    try {
      // Replace this with your actual API endpoint
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, subscriptionId }),
      })

      if (response.ok) {
        // Handle successful cancellation
        console.log("Subscription cancelled successfully")
        // You might want to refresh the page or update the UI
        window.location.reload()
      } else {
        console.error("Failed to cancel subscription")
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error)
    } finally {
      setIsLoading(false)
      setShowCancelDialog(false)
    }
  }

  const handleUpgradePlan = () => {
    // Navigate to pricing section
    const pricingElement = document.getElementById("pricing")
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: "smooth" })
    } else {
      // If on a different page, navigate to home with pricing hash
      router.push("/#pricing")
    }
  }

  // If user doesn't have a plan, just show the badge without dropdown
  if (!priceId) {
    return (
      <Badge
        variant="outline"
        className={cn(
          "ml-2 bg-gradient-to-r from-rose-200 to-red-200 border-red-300 flex flex-row items-center text-xs shadow-sm cursor-pointer",
        )}
        onClick={handleUpgradePlan}
      >
        <Crown className="w-3 h-3 mr-1 text-red-600" />
        {planName}
      </Badge>
    )
  }

  // If user has a plan, show dropdown
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "ml-2 bg-gradient-to-r from-rose-100 to-rose-200 border-rose-300 flex flex-row items-center text-xs shadow-sm cursor-pointer hover:from-rose-200 hover:to-rose-300 transition-all",
            )}
          >
            <Crown className="w-3 h-3 mr-1 text-rose-600" />
            {planName}
            <ChevronDown className="w-3 h-3 ml-1 text-rose-600" />
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleUpgradePlan} className="cursor-pointer">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade Plan
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowCancelDialog(true)}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel Subscription
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will cancel your subscription. You'll lose access to premium features from now. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>No, keep my subscription</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Cancelling..." : "Yes, cancel subscription"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
