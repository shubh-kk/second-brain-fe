import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { CrossIcon } from "./icons/CrossIcon"
import { ShareIcon } from "./icons/ShareIcon"

// Props for the Card component
interface CardProps {
    title: string,
    link: string,
    type: "youtube" | "twitter",
    contentId: string,
    onDelete: () => void // Callback to refresh content after deletion
}

// Card component for displaying content
export const Card = ({ title, link, type, contentId, onDelete }: CardProps) => {
    const [isDeleting, setIsDeleting] = useState(false); // State to manage deletion status

    // Function to handle content deletion
    const handleDelete = async () => {
        try {
            setIsDeleting(true); // Set deleting state to true
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                data: { contentId }, // Send content ID to delete
                headers: {
                    "Authorization": localStorage.getItem("token") // Include token in headers
                }
            });
            onDelete(); // Refresh content after deletion
        } catch (error: any) {
            console.error('Delete error:', error);
            alert(error.response?.data?.msg || 'Failed to delete content'); // Handle error
        } finally {
            setIsDeleting(false); // Reset deleting state
        }
    };

    // Card Container
    return <div className="group transform transition-transform duration-300 ease-out hover:scale-[1.01]">
        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow duration-300 ease-out hover:shadow-lg">
            <div className="flex justify-between mb-4">
                <div className="flex items-center text-lg font-medium text-gray-800">
                    <div className="text-indigo-500 pr-3">
                        <ShareIcon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center gap-3">
                    <a href={link} target="_blank" className="text-gray-400 transition-colors duration-200 C hover:text-indigo-500">
                        <ShareIcon />
                    </a>
                    <button 
                        onClick={handleDelete} // Call delete function on button click
                        disabled={isDeleting} // Disable button while deleting
                        className="text-gray-400 transition-colors duration-200 ease-out hover:text-indigo-500"
                    >
                        {isDeleting ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500" />
                        ) : (
                            <CrossIcon />
                        )}
                    </button>
                </div>
            </div>
            {/* Card Content */}
            <div className="rounded-lg overflow-hidden">
                <div className="pt-4">
                    {/* Youtube Card */}
                    {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {/* {type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>} */}
                    {/* Twitter Card */}
                    {type === "twitter" && (
                        <>
                            <blockquote className="twitter-tweet">
                                <a href={link.replace("x.com", "twitter.com")}>{title}</a>
                            </blockquote>
                            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
}