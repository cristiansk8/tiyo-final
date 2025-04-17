import { ScanQrCode } from "lucide-react"

export const Logo = () => {
    {/* Logo y Título */ }
    return (
        <div className="flex flex-col">
            <h2 className="flex items-center gap-2">
                <ScanQrCode className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                    Tiyo<span className="text-blue-600">Pro</span>
                </span>
            </h2>
        </div>
    )

}