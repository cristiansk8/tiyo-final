import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Plan = {
  title: string;
  price: string;
  features: string[];
  buttonLabel: string;
  highlighted?: boolean;
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
};

const plans: Plan[] = [
    {
      title: "Free",
      price: "0",
      features: [
        "Up to 5 QR codes per month",
        "Basic customization (colors)",
        "Standard download (PNG)",
        "Basic scan statistics (total scans)",
        "Email support"
      ],
      buttonLabel: "Get Started"
    },
    {
      title: "Starter",
      price: "4.99",
      features: [
        "Up to 50 QR codes per month",
        "Advanced customization (colors, logos, shapes)",
        "High-resolution downloads (PNG, SVG, EPS)",
        "Advanced scan statistics (location, device)",
        "Priority email support"
      ],
      buttonLabel: "Get Started",
      highlighted: true // Destacar este plan como recomendado
    },
    {
      title: "Business",
      price: "14.99",
      features: [
        "Unlimited QR codes",
        "Premium customization (templates, branding)",
        "High-resolution and vector downloads",
        "Full scan analytics (graphs, PDF reports)",
        "Social media and payment integrations",
        "Priority chat and email support"
      ],
      buttonLabel: "Get Started"
    },
    {
      title: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited QR codes",
        "Custom branding and domain",
        "API access for integrations",
        "Dedicated account manager",
        "24/7 priority support",
        "Team access (up to 10 users)"
      ],
      buttonLabel: "Contact Sales",
      variant: "outline"
    }
  ];

export function PricingFinal() {
  return (
    <section className="bg-gray-50" id="pricing">
      <div className="py-12 md:py-24 w-full max-w-4xl mx-auto">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Choose Your Plan</h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Select the perfect plan for your needs. Upgrade or downgrade at any time.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <Card key={index} className={`${plan.highlighted ? 'border-blue-600' : ''} hover:shadow-lg`}>
                <CardHeader>
                  <CardTitle className="text-gray-900">{plan.title}</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <Check className="mr-2 h-4 w-4 text-blue-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.variant || 'default'}>
                    {plan.buttonLabel}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}