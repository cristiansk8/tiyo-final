import { scanQr } from "@/actions/qrs";
import { Scan } from "@/types/scan.interface";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { qrActions } from "@/actions";

export default async function CountQrUser({ params }: { params: Promise<{ hash: string }> }) {
  const hash = (await params).hash;

  // Obtén los headers de la solicitud (uso síncrono)
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

  const qr = await qrActions.getQrByHash(hash);

  if (!qr) {

    return redirect("/");
  }

  const scan: Scan = {
    qrId: qr.id, // Usa el ID del QR
    ip: ip, // Usa la IP real del usuario
  };

  // Registra el escaneo en la base de datos
  await scanQr(scan);

  // Redirige a la URL almacenada en qr.name
  return redirect("https://" + qr.description);
}