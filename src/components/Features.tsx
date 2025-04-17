import { BarChart3, QrCode, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: <QrCode className="h-12 w-12 text-blue-600" />,
    title: "Easy QR Code Generation",
    description: "Create custom QR codes in seconds. No technical skills required!"
  },
  {
    icon: <Smartphone className="h-12 w-12 text-blue-600" />,
    title: "Comprehensive Tracking",
    description: "Track date, time, device, and location with every scan."
  },
  {
    icon: <BarChart3 className="h-12 w-12 text-blue-600" />,
    title: "Interactive Dashboard",
    description: "Visualize your data with easy-to-understand charts and graphs."
  }
]

export function Features() {
  return (
    <section className="bg-white py-12 md:py-24 w-full max-w-4xl mx-auto" id="features">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Why Choose TrackQrPro?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Discover the powerful features that make TrackQrPro the best choice for your QR code needs.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
