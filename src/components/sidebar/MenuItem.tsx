'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MenuItem } from './types';

export const SidebarMenuItem = ({ path, icon, title, subTitle }: MenuItem) => {
    const currentPath = usePathname();

    return (
        <Link href={path} className={`
      flex items-center gap-4 pl-4 py-3 text-sm transition-colors
      ${currentPath === path
                ? 'bg-blue-100 text-blue-600 border-l-4 rounded rounded-r-md border-blue-600 -mr-2 shadow-sm shadow-slate-500'
                : 'text-gray-600 hover:bg-gray-50'}
    `}>
            <span className="[&>svg]:h-6 [&>svg]:w-6">{icon}</span>
            <div className=''>
                <p className="font-medium">{title}</p>
                <p className="text-xs text-gray-500">{subTitle}</p>
            </div>
        </Link>
    );
};