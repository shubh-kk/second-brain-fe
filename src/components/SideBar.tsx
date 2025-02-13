import { useState } from 'react';
import { BrainIcon } from './icons/BrainIcon';
import { TwitterIcon, LinkIcon, HashtagIcon, Youtube, Documents } from './icons/Icons';
import { MenuIcon } from './icons/MenuIcon';

// Sidebar component for navigation
export function SideBar() {
    const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

    return (
        <>
            {/* Mobile Toggle Button to open/close sidebar */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
            >
                <MenuIcon />
            </button>

            {/* Overlay for mobile when sidebar is open */}
            {isOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-gray-200 bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)} // Close sidebar on overlay click
                />
            )}

            {/* Sidebar container */}
            <div className={` 
                fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-40
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 // Always visible on medium and larger screens
            `}>
                <div className="p-6">
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
            </div>
        </>
    );
};

// Props for navigation items
interface NavItemProps {
    icon: React.ReactNode;
    text: string;
}

// Navigation item component
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