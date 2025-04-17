import { IoQrCode } from "react-icons/io5";
import { User, SquarePlus, CreditCard, CircleHelp, ChartBarBigIcon, Settings } from 'lucide-react';
import { MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
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

    // ... resto de los items
];