
import { CTA } from "@/components/CTA";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import Providers from "@/components/Providers";
import Header from "@/components/header";



export default function Home() {
  return (
    <Providers>
      <Header />
      <main className="flex flex-col px-2">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Pricing Section */}
        <Pricing />

        {/* Final CTA Section */}
        <CTA />

        {/* Footer */}
        <Footer />
      </main>
    </Providers>
  );
}
