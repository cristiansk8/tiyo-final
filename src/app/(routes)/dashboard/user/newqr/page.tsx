import { QRForm } from "@/components/ui/qrForm";
import Link from "next/link";
import { auth } from "@/auth";
import { getUserByEmail } from "@/actions/user";


export default async function NewQr() {

  const limitCode = 3

  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  const user = await getUserByEmail(session?.user?.email || "");

  const qrs = user?.data?.qr || [];

  return (
    <div>
      <div className="px-4 my-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-blue-600 tracking-tight">
            Create new qr
          </h1>
          {
            qrs.length > 0 ?
              <div className="flex flex-row gap-2 mt-1 text-sm text-gray-400">
                <p className="">
                  {
                    `You can create ${limitCode - qrs.length} QR${qrs.length > 1 ? 's' : ''} more code${qrs.length > 1 ? 's' : ''}.`
                  }
                </p>
                <Link href={'/dashboard/user/settings'} className="text-blue-600">Upgrade your plan to get more.</Link>
              </div>
              :
              <p>
                Ready to create your first QR?
              </p>
          }
        </div>
      </div>
      {
        qrs.length >= limitCode ? null :
          <QRForm email={session.user?.email || ''} />
      }
    </div>
  );
}