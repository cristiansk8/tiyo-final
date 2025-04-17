import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/auth";

import { qrActions } from "@/actions";

import { QRcard } from "@/components/ui/qrCard";
import { Spinner } from "@/components/Spinner";
export default async function QrPage() {

  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  const { data: qrs, error } = await qrActions.getQRsByUser(
    session?.user?.email || ""
  );

  if (error) return <div>Error: {error}</div>;
  if (!qrs) return <div>No hay QRs</div>;

  return (
    <div className="w-full max-w-full overflow-x-hidden">

      <div className="px-4 my-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-blue-600 tracking-tight">
            QR Codes
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {qrs.length > 0
              ? `${qrs.length} QR${qrs.length > 1 ? 's' : ''} created`
              : "Ready to create your first QR?"}
          </p>
        </div>
      </div>

      <div className="h-full w-full px-4 flex flex-col overflow-hidden">
        {/* Container scroll */}
        <div className="flex-1 overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex justify-center py-4">
                <Spinner size="12" />
              </div>
            }
          >
            {/* List de QRs */}
            {qrs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <h3 className="text-lg font-medium text-gray-500">
                  No QRs created yet
                </h3>
                <p className="text-gray-400 mb-4">
                  Start by creating your first QR code
                </p>
                <Link
                  href={'/dashboard/user/newqr'}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Create First QR
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 pb-4">
                {qrs.map((qr) => (
                  <QRcard key={qr.id} task={qr} />
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </div>
      <div></div>
      {
        qrs.length > 0 && (
          <div className="flex justify-end px-4 py-4">
            <Link
              href={'/dashboard/user/newqr'}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Create New QR
            </Link>
          </div>
        )
      }
    </div>
  );
}
