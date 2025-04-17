import SigninButton from "./auth/SigninButton";

const Header = () => {
    return (
        <header className="flex gap-4 p-4 bg-gradient-to-b sticky top-0 z-50 bg-white shadow-sm">
            {/* <Appbar /> */}
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <h1 className="text-2xl font-bold text-gray-900">Tiyo</h1>
                <nav className="hidden space-x-6 md:flex items-center">
                    <a href="#features" className="text-gray-600 transition-colors hover:text-blue-600">
                        Features
                    </a>
                    <a href="#pricing" className="text-gray-600 transition-colors hover:text-blue-600">
                        Pricing
                    </a>
                    <a href="#cta" className="text-gray-600 transition-colors hover:text-blue-600">
                        FAQ
                    </a>
                    {/* <SigninButton>
                        Create Qr
                    </SigninButton> */}
                    <SigninButton
                        urlRedirec="/dashboard/user/profile"
                        className={"bg-blue-600 text-white hover:text-black"}
                    >
                        Create Qr
                    </SigninButton>
                </nav>
            </div>
        </header>
    );
}

export default Header;