'use client'
import { MENU_ITEMS } from "./MenuItems";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarMenuItem } from "./MenuItem";
import SignoutButton from "../auth/SignoutButton";

import clsx from "clsx";
import { useUIStore } from "@/store";
import { AlignJustify } from "lucide-react";
import { Logo } from "../Logo";
import { SidebarHeader } from "./SidebarHeader";

interface PropsSideBar {
    image?: string | null;
    name?: string | null;
}

export const Sidebar = ({ image, name }: PropsSideBar) => {

    const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
    const closeMenu = useUIStore((state) => state.closeSideMenu);
    const openSideMenu = useUIStore(state => state.openSideMenu);

    return (
        <div>
            {/* Botón de hamburguesa (solo móvil) */}
            <div className='flex flex-row justify-between px-8 md:hidden'> {/* md:hidden oculta en desktop */}
                <button
                    className=''
                    onClick={openSideMenu}
                >
                    <AlignJustify />
                </button>
                <div className='flex py-3'>
                    <Logo />
                </div>
            </div>

            {/* Backdrop (solo móvil) */}
            {isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 md:hidden" onClick={closeMenu}></div>
            )}
            {isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm md:hidden" onClick={closeMenu}></div>
            )}

            {/* Sidebar (fijo en desktop) */}
            <div
                className={clsx(
                    "fixed top-0 left-0 h-screen z-20 shadow-2xl transform transition-all duration-300",
                    "md:translate-x-0 md:static", // Desktop: posición normal y sin transform
                    {
                        "-translate-x-full": !isSideMenuOpen // Móvil: se esconde
                    }
                )}
            >
                <div className="relative h-full max-h-screen bg-white min-h-screen w-64 border-r shadow-sm">
                    {/* Desktop: Logo y perfil */}
                    <div className=""> {/* Solo en desktop */}
                        <SidebarHeader
                            handleClick={closeMenu}
                        />
                        <SidebarProfile
                            user={{ image: image || undefined, name: name }}
                        />
                    </div>

                    {/* Menú (compartido en móvil y desktop) */}
                    <nav className="pl-2">
                        {MENU_ITEMS.map((item) => (
                            <SidebarMenuItem key={item.path} {...item} />
                        ))}
                    </nav>

                    {/* Botón de cerrar sesión */}
                    <div className="absolute bottom-0 w-full">
                        <SignoutButton className="w-full rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
};