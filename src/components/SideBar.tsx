import { BrainIcon } from './icons/BrainIcon';
import { TwitterIcon, DocumentIcon, LinkIcon, HashtagIcon, Youtube, Documents } from './icons/Icons';

export const SideBar = () => {
    return (
        <div className="h-screen bg-white border-r border-gray-100 w-72 fixed left-0 top-0 p-4">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 text-purple-500">
                    <BrainIcon/>
                </div>
                <span className="text-2xl font-semibold text-gray-900">Second Brain</span>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
                <NavItem icon={<TwitterIcon />} text="Tweets" />
                <NavItem icon={<Youtube />} text="Videos" />
                <NavItem icon={<Documents />} text="Documents" />
                <NavItem icon={<LinkIcon />} text="Links" />
                <NavItem icon={<HashtagIcon />} text="Tags" />
            </nav>
        </div>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    text: string;
}

const NavItem = ({ icon, text }: NavItemProps) => {
    return (
        <a 
            href="#" 
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg 
            hover:bg-gray-200 hover:text-indigo-600 transition-colors duration-200"
        >
            <div className="w-5 h-5">
                {icon}
            </div>
            <span className="text-sm font-medium">{text}</span>
        </a>
    );
};