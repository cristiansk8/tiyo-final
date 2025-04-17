import { Logo } from '../Logo';
import { PanelRightOpen } from 'lucide-react';


interface Props {
    handleClick: () => void
}

export const SidebarHeader = ({ handleClick }: Props) => (
    <div className='flex flex-row px-4 md:px-0 justify-between bg-white'>
        <div className='flex md:pl-6 py-3'>
            <Logo />
        </div>
        <button
            className='md:hidden'
            onClick={handleClick}
        >
            <PanelRightOpen />
        </button>
    </div>
);