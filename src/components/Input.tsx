interface InputProps {
    placeHolder: string;
    reference?: any
}

export function Input({ placeHolder, reference }: InputProps) {
    return (
        <input
            type="text"
            className="w-full px-4 py-2  m-2 border-1 border-gray-400 rounded-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
            placeholder={placeHolder}
            ref={reference}
        />
    );
}