
import Image from 'next/image'
import { IoQrCode } from "react-icons/io5"
import SignoutButton from '../auth/SignoutButton'
import { User, SquarePlus, CreditCard, CircleHelp, ChartBarBigIcon, Settings, AlignJustify } from 'lucide-react'
import { auth } from '@/auth'
import { Logo } from '../Logo'
import { SidebarMenuItem } from './MenuItem'


const menuItems = [
  {
    path: '/dashboard/user/qrs',
    icon: <IoQrCode className="h-6 w-6 text-blue-500" />,
    title: 'QR Codes',
    subTitle: 'Manage your QR codes'
  },
  {
    path: '/dashboard/user/newqr',
    icon: <SquarePlus className="h-6 w-6 text-blue-500" />,
    title: 'New QR Code',
    subTitle: 'Create a QR code'
  },
  {
    path: '/dashboard/user/stats',
    icon: <ChartBarBigIcon className="h-6 w-6 text-blue-500" />,
    title: 'Statistics',
    subTitle: 'Track QR scans'
  },
  {
    path: '/dashboard/user/profile',
    icon: <User className="h-6 w-6 text-blue-500" />,
    title: 'Profile',
    subTitle: 'Edit your info'
  },
  {
    path: '/dashboard/user/settings',
    icon: <Settings className="h-6 w-6 text-blue-500" />,
    title: 'Settings',
    subTitle: 'Customize preferences'
  },
  {
    path: '/dashboard/user/billing',
    icon: <CreditCard className="h-6 w-6 text-blue-500" />,
    title: 'Billing',
    subTitle: 'Manage payments'
  },
  {
    path: '/dashboard/user/support',
    icon: <CircleHelp className="h-6 w-6 text-blue-500" />,
    title: 'Support',
    subTitle: 'Get assistance'
  }
];

export const Sidebar = async () => {
  const session = await auth()

  /* if (!session?.user) return null */

  return (
    <div>
      <div className='md:hidden flex flex-row'>
        <button className=''><AlignJustify /></button>
        <Logo />
      </div>

      <div className="hidden md:block relative h-full max-h-screen bg-white min-h-screen w-64 border-r shadow-sm">
        <Logo />

        {/* Perfil del usuario */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full w-10 h-10 border-2 border-black"
              src={session?.user?.image || "/logo.png"}
              alt="User avatar"
              width={48}
              height={48}
            />
            <span className="font-medium text-gray-900">
              {session?.user?.name}
            </span>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="pl-2">
          {menuItems.map(item => (
            <SidebarMenuItem key={item.path} {...item} />
          ))}
        </nav>
        <div className="absolute bottom-0 w-full">
          <SignoutButton className="w-full rounded" />
        </div>
      </div>
    </div>
  )
}