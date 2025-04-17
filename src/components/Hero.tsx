import { QrCode } from "lucide-react"
import Image from "next/image"
import SigninButton from "./auth/SigninButton"

export function Hero() {
    return (
        <section className="w-full bg-gradient-to-b from-blue-500 to-blue-600">
            <div className="container mx-auto px-4 py-20 text-center text-white">
                <div className="mx-auto max-w-2xl">
                    <QrCode className="mx-auto mb-6 h-16 w-16" />
                    <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                        Unlock the Power of QR Codes
                    </h1>
                    <p className="mx-auto mb-8 text-lg text-gray-200 md:max-w-xl">
                        Generate, track, and analyze your QR codes effortlessly with TrackQrPro, your ultimate tool for seamless QR code management.
                    </p>
                    <div className="w-full max-w-sm mx-auto justify-around flex flex-row items-center ">
                        <Image
                            className="w-36 h-auto dark:invert"
                            src="/qr.jpg"
                            alt="TrackQrPro logo"
                            width={180}
                            height={38}
                            priority
                        />
                        <SigninButton
                            urlRedirec="/dashboard/user/profile"
                        >Create Qr</SigninButton>
                    </div>
                </div>
            </div>
        </section>
    )
}