import axios from "axios";
import { Button } from "./Button";
import { Input } from "./Input";
import { CrossIcon } from "./icons/CrossIcon";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";

// Add useOutsideClick hook
function useOutsideClick(callback: () => void) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [callback]);

    return ref;
}

export default function CreateContentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const modalRef = useOutsideClick(onClose);
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();

    enum ContentType {
        Youtube = "youtube",
        Twitter = "twitter"
    }
    const [type, setType] = useState(ContentType.Youtube);

    async function createContent() {
        try {
            const title = titleRef.current?.value;
            const link = linkRef.current?.value;

            if (!title || !link) {
                alert("Please fill in all fields");
                return;
            }
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {
                title,
                link,
                type
            }, {
                headers: {
                    "Authorization": `${localStorage.getItem("token")}`
                }
            });

            if (response.status === 201) {
                alert("Content added successfully!");
                onClose(); // Close modal after successful addition
            }


        } catch (error: any) {
            console.error("Content creation error:", error);
            alert(error.response?.data?.msg || "Failed to create content. Please try again.");
        }
    }

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-gray-500/75 backdrop-blur-xs"/>
                    <div className="relative h-full flex justify-center items-center">
                        <div ref={modalRef} className="bg-white rounded-xl p-6 w-[28rem] shadow-xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Add New Content</h2>
                                <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={onClose}>
                                    <CrossIcon />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <Input reference={titleRef} placeHolder="Title" />
                                <Input reference={linkRef} placeHolder="Link" />
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content Type
                                </label>
                                <div className="flex gap-4">
                                    <div 
                                        className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-all ${
                                            type === ContentType.Youtube 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setType(ContentType.Youtube)}
                                    >
                                        <input 
                                            type="radio" 
                                            checked={type === ContentType.Youtube}
                                            onChange={() => setType(ContentType.Youtube)}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium">Youtube</span>
                                    </div>

                                    <div 
                                        className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-all ${
                                            type === ContentType.Twitter 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setType(ContentType.Twitter)}
                                    >
                                        <input 
                                            type="radio" 
                                            checked={type === ContentType.Twitter}
                                            onChange={() => setType(ContentType.Twitter)}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium">Twitter</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Input placeHolder="Enter category"/>
                            </div>

                            <div className="flex justify-end mt-6">
                                <Button 
                                    text="Submit" 
                                    variant="primary" 
                                    onClick={createContent}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

