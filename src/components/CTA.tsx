import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import SigninButton from "./auth/SigninButton"

export function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-20 text-white" id="cta">
      <div className="container mx-auto px-4 text-center">
        <QrCode className="mx-auto mb-6 h-16 w-16" />
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Tracking?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200">
          Join countless businesses and take control of your QR code data.
          Unlock powerful insights and boost your marketing efforts today!
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <SigninButton
            urlRedirec="/dashboard/user/profile"
          >Create Qr</SigninButton>
          <Button size="lg" variant="outline" className="border-white text-blue-600 hover:bg-blue-600 hover:text-white">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}