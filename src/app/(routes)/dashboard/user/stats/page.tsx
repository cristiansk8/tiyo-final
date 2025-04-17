import QrStatisticsChart from "@/components/graphics/QrStatisticsChart";
import { auth } from "@/auth";
import { scansActions } from "@/actions";
import Link from "next/link";
import { CircleAlert } from "lucide-react";

export default async function StatisticsPage() {
  const session = await auth();
  if (!session) return <div className="p-4 text-red-500">Not authenticated</div>;

  const email = session.user?.email || '';
  const qr = await scansActions.getScansByUser(email);

  const qrChartData = qr.qr.map(qr => ({
    name: qr.description || `QR ${qr.id}`,
    scans: qr.scans.length,
  }));

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="px-4 my-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-blue-600 tracking-tight">
            Scan Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {qr.qr.length > 0
              ? `${qr.qr.length} QR${qr.qr.length > 1 ? 's' : ''} created`
              : "Ready to create your first QR?"}
          </p>
        </div>
      </div>

      {qr.qr.length > 0 ? (
        <section className="mt-12 text-center bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-xl font-semibold mb-4 text-gray-700 ">
            Scans per QR Code
          </h2>
          <QrStatisticsChart data={qrChartData} />

        </section>
      ) : (
        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center justify-center space-y-4">
            <CircleAlert className="h-16 w-16 text-gray-400  mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900">
              No QR Codes Found
            </h3>
            <p className="text-gwray-600 dark:text-gray-400 max-w-md mx-auto">
              Start tracking your QR code scans by creating your first QR code.
            </p>
            <Link
              href="/dashboard/user/newqr"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Create First QR Code
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}