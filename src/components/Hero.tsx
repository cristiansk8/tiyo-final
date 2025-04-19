import Image from "next/image"
import SigninButton from "./auth/SigninButton"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Fondo para mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src="/bg-hero.jpg"
          alt="Fondo móvil"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
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
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Contenido */}
      <div className="container relative mx-auto px-4 py-20 text-center z-10 text-white">
        <div className="mx-auto max-w-2xl">
          <div className="flex justify-center">
            <Image
              src="/logo-texto.png"
              alt="tiyo"
              width={500}
              height={100}
              className="transition-all duration-300 h-50 w-auto drop-shadow-lg"
              priority
            />
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl drop-shadow-md">
            Vende nuestro catálogo al por mayor o detal
          </h1>
          <p className="mx-auto mb-8 text-lg text-gray-100 md:max-w-xl bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
            Emprende, crece, vive
          </p>
          <div className="w-full max-w-sm mx-auto justify-around flex flex-row items-center">
            <SigninButton
              urlRedirec="/dashboard/user/profile"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold border-2 border-white/80 shadow-xl transition-all duration-300 hover:scale-105"
            >
              Empezar
            </SigninButton>
          </div>
        </div>
      </div>
    </section>
  )
}
