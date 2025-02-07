import { Button } from "./components/Button";
import { CrossIcon } from "./components/icons/CrossIcon";

export default function CreateContentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-gray-500/75 backdrop-blur-sm" onClick={onClose} />
                    <div className="relative h-full flex justify-center items-center">
                        <div className="bg-white rounded-xl p-6 w-[28rem] shadow-xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Add New Content</h2>
                                <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={onClose}>
                                    <CrossIcon />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <Input placeHolder="Title" onChange={() => {}} />
                                <Input placeHolder="Link" onChange={() => {}} />
                            </div>
                            <div className="flex justify-end mt-6">
                                <Button text="Submit" variant="primary" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function Input({ onChange, placeHolder }: { onChange?: () => void; placeHolder: string }) {
    return (
        <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder={placeHolder}
            onChange={onChange}
        />
    );
}