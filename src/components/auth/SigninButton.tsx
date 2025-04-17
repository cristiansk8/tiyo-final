"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/libs/utils";

interface Props {
  urlRedirec?: string,
  provider?: "google" | "github" | "auth0";
  className?: string;
  children?: React.ReactNode;
}

export default function SigninButton({ urlRedirec = "/",
  provider = "google",
  className,
  children }: Props) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    try {
      setLoading(true);
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: urlRedirec
      });

      if (result?.error) throw new Error(result.error);
      if (result?.url) router.push(result.url);

    } catch (error) {
      console.error("Login error:", error);
      // Aquí podrías agregar un toast o notificación
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignin}
      disabled={loading}
      className={cn(
        "px-4 py-2 rounded-md transition-colors",
        "bg-white text-blue-600 hover:bg-gray-100",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Debug: descomenta para ver clases aplicadas
        //  "border-2 border-red-500", 
        className
      )}
    >
      {loading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        <>
          {children || "Login"}
        </>
      )}
    </button>
  );
}