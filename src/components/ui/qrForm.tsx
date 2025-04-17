"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { generateQRCodeDataURL } from "@/components/qr";

import SigninButton from "@/components/auth/SigninButton";
import { QrCode } from "lucide-react";
import { createQR } from "@/actions/qr/create-qr.action";

import crypto from "crypto";



interface Props {
    email: string;
}

export function QRForm({ email }: Props) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const urlScan = "scan"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

        const hash = crypto.createHash("sha256").update(email + Date.now().toString()).digest("hex").slice(0, 10);

        const generatedUrl = `${baseUrl}/${urlScan}/${hash}`;

        const qrC = await generateQRCodeDataURL(generatedUrl);

        const newQR = await createQR(name, url, email, hash, generatedUrl, qrC)

        console.log(newQR);


        setSuccessMessage("Saved successfully ✅");
        setUrl("");
        setName("");
        setTimeout(() => setSuccessMessage(""), 3000);
        router.refresh();
    };

    if (status !== "authenticated" || !session?.user?.email) {
        return (
            <p className="text-red-500">
                You must log in to create a task.
                <SigninButton
                    urlRedirec="/dashboard/user/profile"
                    className={"bg-blue-600 text-white"}
                >
                    Create QR
                </SigninButton>
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-600">Create a QR Code</h2>

            {successMessage && (
                <p className="text-green-600 font-medium">{successMessage}</p>
            )}
            <div className="flex flex-col md:flex-row items-start justify-between">
                <div className="w-full space-y-4 p-4">
                    <div>
                        <label className="text-gray-400 font-bold">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 font-bold">Url</label>
                        <input
                            type="text"
                            placeholder="URL (e.g., myshop.com)"
                            value={url}
                            onChange={(e) => {
                                let value = e.target.value;

                                // Remove unwanted prefixes (http://, https://)
                                value = value.replace(/^https?:\/\//i, "");
                                // Remove trailing slash if it exists
                                value = value.replace(/\/$/, "");
                                // Assign formatted value to state
                                setUrl(value);
                            }}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center px-4 pt-2  bg-white w-60">
                    <label className="text-gray-400 font-bold mb-2">QR Preview</label>

                    <div className="relative flex flex-col items-center gap-3">
                        <div className="p-4 border border-gray-300 rounded-lg">
                            <QrCode
                                className={`h-48 w-48 transition-opacity duration-300 ${url ? "opacity-100" : "opacity-30 blur-md"
                                    }`}
                            />
                        </div>

                        {url ? (
                            <p className="text-sm text-gray-600 text-center flex items-center gap-2">
                                <QrCode className="h-5 w-5 text-blue-600" />
                                This is a preview; the final QR will be generated upon completion.
                            </p>
                        ) : (
                            <p className="text-gray-400 text-sm text-center">Generating your QR code...</p>
                        )}
                    </div>
                </div>


            </div>

            <Button className="bg-blue-600 text-white" type="submit">Save</Button>
        </form>
    );
}
