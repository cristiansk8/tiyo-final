'use client';
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChartNoAxesCombined, Download, Pencil, Trash2 } from "lucide-react";
import { ApiQR } from "@/types/QR.interface";

export function QRcard({ task }: { task: ApiQR }) {
  const [qrCode, setQRCode] = useState("");

  useEffect(() => {
    if (task.qrCode) {
      setQRCode(task.qrCode);
    }
  }, [task.qrCode]);

  const handleDownloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qr-${task.name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteQR = async () => {
    if (!task.id || !task.userEmail) {
      alert("Error: Could not identify the QR or user.");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this QR?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/qrs`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: task.id }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("QR successfully deleted");
        window.location.reload(); // Reload the page to update the QR list
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting QR:", error);
      alert("There was a problem deleting the QR.");
    }
  };

  return (
    <div className="flex flex-row w-full max-w-full justify-between mt-2 gap-2 px-4 bg-white rounded-xl shadow-lg transition-all hover:shadow-xl">
      <div className="flex flex-col gap-4 w-full p-2">
        <div className="flex flex-row justify-between w-full">
          <h2 className="text-xl text-blue-600 font-semibold capitalize">{task.name}</h2>
          <div className="flex">
            <Link
              href={`/qrs/${task.id}/edit`}
              className={buttonVariants({ variant: "secondary" })}
            >
              <Pencil />
            </Link>
            <button
              onClick={handleDownloadQR}
              className={buttonVariants({ variant: "default" })}
              disabled={!qrCode}
            >
              <Download />
            </button>
            <button
              onClick={handleDeleteQR}
              className="text-red-600 hover:text-red-800 transition-colors p-2"
            >
              <Trash2 />
            </button>

            <Link
              href={`qrs/${task.hash}`}
              className="flex items-center gap-1 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-sm hover:bg-gray-700 transition-all">
              <ChartNoAxesCombined size={12} />
              Details
            </Link>

          </div>
        </div>
        <div>
          <Link target="_blank" href={`https://${task.description}`}>
            <p>{task.description}</p>
          </Link>
          {/* <span className="text-slate-600">
            {new Date(task.createdAt).toLocaleDateString()}
          </span> */}
        </div>
      </div>
      <div className="flex flex-col">
        <Image className="h-36 w-36 object-contain" src={qrCode} alt="Generated QR Code" width={300} height={300} />
        <span>Scanned: {task.scanCount}</span>
      </div>
    </div>
  );
}
