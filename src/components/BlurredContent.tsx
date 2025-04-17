import { ReactNode } from "react";

interface BlurredContentProps {
    plan: "Basic" | "Pro" | "Enterprise";
    children: ReactNode;
}

export default function BlurredContent({ plan, children }: BlurredContentProps) {
    const isLimited = plan === "Basic";

    return (
        <div className="relative w-full">
            <div className={`relative w-full p-6  rounded-lg shadow-md transition-all ${isLimited ? "opacity-50 blur-sm bg-gray-200" : "opacity-100 bg-gray-50"}`}>
                {children}
            </div>
        </div>
    );
}
