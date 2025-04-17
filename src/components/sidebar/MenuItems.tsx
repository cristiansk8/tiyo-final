import { User, CreditCard, CircleHelp, ChartBarBigIcon, Settings } from 'lucide-react';
import { MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
    {
        path: '/dashboard/user/stats',
        icon: <ChartBarBigIcon className="h-6 w-6 text-blue-500" />,
        title: 'Statistics',
        subTitle: 'check data'
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