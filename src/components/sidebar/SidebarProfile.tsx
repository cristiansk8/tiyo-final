import Image from 'next/image';

interface Props {
    user?: {
        image?: string | null; // Permitir null
        name?: string | null;
    }
}

export const SidebarProfile = ({ user }: Props) => (
    <div className="pl-6 py-3 flex items-center gap-3">
        <Image
            className="rounded-full w-6 h-6 border-2 border-black"
            src={user?.image || "/logo.png"} // Maneja null/undefined
            alt="User avatar"
            width={48}
            height={48}
        />
        <span className="font-medium text-gray-600">
            {user?.name || 'Usuario'}
        </span>
    </div>
);