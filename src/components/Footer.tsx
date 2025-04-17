import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-4xl grid grid-cols-1 gap-8 md:grid-cols-3 mx-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Tiyo</h3>
            <p className="text-gray-600">
            Revolucionando las ventas digitales para empresas de todo el mundo.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link href="#features" className="text-gray-600 hover:text-blue-600">
                Caracteristicas
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600">
                Precios
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Tiyo. All rights reserved.</p>
          <p className="mt-2">
            Developed by{" "}
            <Link href="https://deepfc.vercel.app/" className="hover:text-blue-600">
              DeepFC
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}