import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Definición del tipo para los planes
export type Plan = {
  title: string
  description: string
  price: string
  frequency: string
  features: string[]
  buttonLabel: string
  buttonVariant?: "default" | "outline"
}

// Componente PricingCard
export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <Card className={plan.buttonVariant === "default" ? "border-primary" : ""}>
      <CardHeader>
        <CardTitle>{plan.title}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="text-gray-500 dark:text-gray-400">{plan.frequency}</span>
        <ul className="space-y-2 mt-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={plan.buttonVariant || "default"}>
          {plan.buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
