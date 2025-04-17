import { qrActions } from "@/actions";
import { ScanAccordion } from "@/components/ScanAccordion";
import { Scan } from "@/types/QR.interface";
/* import { ChartNoAxesCombined } from "lucide-react"; */

import QrStatisticsChart from "@/components/graphics/QrStatisticsChart";
import { Lock } from "lucide-react";
import BlurredContent from "@/components/BlurredContent";
import Link from "next/link";


export default async function PageQR({ params }: { params: Promise<{ hash: string }> }) {

  const hash = (await params).hash;
  const qr = await qrActions.getQrAllByHash(hash);

  if (!qr) {
    return <div className="text-center py-20 text-red-500 text-xl">QR Not Found</div>;
  }
  const generateDataGraphDate = Object.entries(
    qr.scans.reduce((acc, scan) => {
      const day = new Date(scan.scannedAt).toISOString().split('T')[0]; // Formato: YYYY-MM-DD
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number })
  ).map(([date, count]) => ({
    name: date,
    scans: count
  }));

  const generateDataGraphHour = Object.entries(
    qr.scans.reduce((acc, scan) => {
      const hour = new Date(scan.scannedAt).getHours();
      const hourLabel = `${hour}:00 - ${hour + 1}:00`;
      acc[hourLabel] = (acc[hourLabel] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number })
  )
    .map(([hour, count]) => ({
      name: hour,
      scans: count
    }))
    .sort((a, b) => parseInt(a.name) - parseInt(b.name))

  const isLimited = qr.user.plan === "Basic";


  return (
    <div className="w-full mx-auto p-6 space-y-8 h-auto max-h-screen  overflow-y-auto">
      {/* QR Information Section */}
      <div className="mb-8 p-8 bg-white rounded-xl shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-start justify-between">

          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-800"> {qr.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{`Website : ${qr.description}` || "No description provided"}</p>

            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Created: {new Date(qr.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xl font-bold text-blue-600">
                  <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Total Scans: {qr.scans.length}
                </p>
              </div>
            </div>
          </div>

          {qr.qrCode && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow-inner">
              <img src={qr.qrCode} alt="QR Code" className="w-40 h-40 object-contain" />
            </div>
          )}
        </div>
      </div>

      <ScanAccordion scans={qr.scans as Scan[]} />

      {/* Grabic section */}
      <div className="mb-8 p-8 bg-white rounded-xl shadow-lg transition-all hover:shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-blue-500 mb-4">Scan Statistics</h1>

          <div className="w-full flex flex-col">
            {/* Scans by date */}
            <div className="flex flex-col w-full max-w-7xl mx-auto mt-6">
              <div className="flex flex-row w-full justify-between py-3">
                <h2 className="text-2xl font-semibold text-blue-400 ">Scans by Date</h2>
                {
                  isLimited && (
                    <Link
                      href={"/dashboard/user/settings"}
                      className="flex items-center gap-1 bg-gray-800 text-white text-[10px] px-2 py-1 rounded-md shadow-sm hover:bg-gray-700 transition-all">
                      Upgrade
                      <Lock size={12} />
                    </Link>
                  )
                }
              </div>
              <BlurredContent plan={qr.user.plan}>
                <QrStatisticsChart data={generateDataGraphDate as []} />
              </BlurredContent>
            </div>


            {/* Scans by hour */}

            <div className="flex flex-col w-full max-w-7xl mx-auto mt-6">
              <div className="flex flex-row w-full justify-between py-3">
                <h2 className="text-2xl font-semibold text-blue-400 ">Scans by Hour</h2>
                {
                  isLimited && (
                    <Link
                      href={"/dashboard/user/settings"}
                      className="flex items-center gap-1 bg-gray-800 text-white text-[10px] px-2 py-1 rounded-md shadow-sm hover:bg-gray-700 transition-all">
                      Upgrade
                      <Lock size={12} />
                    </Link>
                  )
                }
              </div>
              <BlurredContent plan={qr.user.plan}>
                <QrStatisticsChart data={generateDataGraphHour as []} />
              </BlurredContent>
            </div>
          </div>
        </div>
      </div>




      {/* Owner Section */}
      {/*  {qr.user && (
          <div className="p-8 bg-white rounded-xl shadow-lg transition-all hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Owner Information</h2>
            <div className="flex items-center space-x-6">
              {qr.user.photo ? (
                <img
                  src={qr.user.photo}
                  alt="User profile"
                  className="w-20 h-20 rounded-full shadow-md border-4 border-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-blue-600">{qr.user.name?.[0] || '?'}</span>
                </div>
              )}
              <div className="space-y-2">
                <p className="text-xl font-medium text-gray-800">{qr.user.name || 'Anonymous'}</p>
                <p className="text-gray-600 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                  </svg>
                  {qr.user.email}
                </p>
                {qr.user.phone && (
                  <p className="text-gray-600 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    {qr.user.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
 */}


      {/* Scan History */}
      {/* <div className="p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Scan History ({qr.scans.length})</h2>
        <div className="space-y-3">
          {qr.scans.map((scan) => (
            <div key={scan.id} className="group p-4 hover:bg-gray-50 rounded-lg transition-colors border-b last:border-b-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-600">
                    {new Date(scan.scannedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="text-sm font-mono text-gray-500">{scan.ip || 'Unknown IP'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}