import { Footprints } from "lucide-react"
import SigninButton from "./auth/SigninButton"

export function CTA() {
  return (
    <section className="relative overflow-hidden py-20 text-white" id="cta">
      {/* Imagen de fondo para mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        <img
          src="/bg-hero.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-blue-500/10 to-blue-600/10"></div>
      </div>

      {/* Video de fondo para desktop */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg-cta.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-blue-500/70 to-blue-600/70"></div>
      </div>

      {/* Contenido */}
      <div className="container relative mx-auto px-4 text-center z-10">
        <Footprints className="mx-auto mb-6 h-16 w-16 text-white" />

        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          <span className="backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
            ¿Listo para empezar a vender?
          </span>
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg font-medium text-gray-100 backdrop-blur-sm px-6 py-4 rounded-lg inline-block">
          ¡Descubre información valiosa e impulsa tus estrategias de marketing hoy mismo!
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <SigninButton
            urlRedirec="/dashboard/user/profile"
            className="transform hover:scale-105 transition-all duration-300 shadow-xl font-bold text-white bg-blue-600 hover:bg-blue-700 border-2 border-white/30 px-8 py-3 text-lg"
          >
            Empezar ahora →
          </SigninButton>
        </div>
      </div>
    </section>
  )
}
