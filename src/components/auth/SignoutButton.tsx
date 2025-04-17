"use client";

import { cn } from "@/libs/utils";
import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    urlRedirec?: string,
    className?: string;
    children?: React.ReactNode;
}

export default function SignoutButton({ urlRedirec = "/", className, children }: Props) {

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSignOut = async () => {
        try {
            setLoading(true)
            await signOut({
                redirect: false,
                callbackUrl: urlRedirec
            });
            router.push(urlRedirec);
            router.refresh()
        } catch (error) {
            console.log("SignOut :", error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <button
            onClick={handleSignOut}
            disabled={loading}
            className={cn(
                "px-4 py-2 rounded-md transition-colors",
                "bg-red-600 text-white hover:bg-red-700",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
        >
            {loading ? (
                <span className="animate-pulse">Cerrando sesión...</span>
            ) : (
                children || "Log out"
            )}
        </button>
    );
}