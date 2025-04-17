import { useEffect, useState } from "react";

interface QRUrlGeneratorProps {
  hash: string;
  onGenerate?: (url: string) => void; // Definimos el tipo de onGenerate correctamente
}

export function QRUrlGenerator({ hash, onGenerate }: QRUrlGeneratorProps) {
  const [qrUrl, setQrUrl] = useState("");
  const urlScan = "scan"

  useEffect(() => {
    if (!hash) return;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const generatedUrl = `${baseUrl}/${urlScan}/${hash}`;


    setQrUrl(generatedUrl);
    console.log(qrUrl)

    if (onGenerate) {
      onGenerate(generatedUrl);
    }
  }, [hash, onGenerate, qrUrl]);

  return (
    <div>
      {/*       <p>URL de seguimiento:</p>
      <a href={qrUrl} target="_blank" rel="noopener noreferrer">
        {qrUrl}
      </a> */}
    </div>
  );
}
