import { BarChart3, Footprints, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: <Footprints className="h-12 w-12 text-blue-600" />,
    title: "Catalogo digital adminstrable",
    description: "Crea un catalogo de venta de acuerdo a tu publico."
  },
  {
    icon: <Smartphone className="h-12 w-12 text-blue-600" />,
    title: "Apoyo tecnologico",
    description: "Recibe apoyo tecnologico para crecer rapidamente."
  },
  {
    icon: <BarChart3 className="h-12 w-12 text-blue-600" />,
    title: "Panel de administracion interactivo",
    description: "Visualiza ventas y clientes de acuerdo a tus necesidades."
  }
]

export function Features() {
  return (
    <section className="bg-white py-12 md:py-24 w-full max-w-4xl mx-auto" id="features">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Tienes dudas?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Empeiza a ver resultados en segundos
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
