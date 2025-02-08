//generic button component 
import { ReactElement } from "react";

type variantType = "primary" | "secondary" ;
interface ButtonProps{
    variant: variantType; 
    text: string ;
    startIcon? : ReactElement ;
    onClick?: () => void ;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
}
const variantStyles = {
    "primary": "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-200",
    "secondary": "bg-white text-indigo-600 border border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 shadow-sm hover:shadow-md transition-all duration-200"
}

const defaultStyles = "px-4 py-2 rounded-lg font-medium items-center text-sm"
export const Button =  ({variant, onClick, text, startIcon, fullWidth, loading, disabled}: ButtonProps) => {
    return <>
        <button onClick={onClick} className={`${variantStyles[variant]} ${defaultStyles} flex ${fullWidth? " w-full flex justify-center items-center" : ""} ${loading ? " opacity-45": ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading || disabled} >
           <div className="pr-2"> {startIcon}</div> {text}
        </button>
    </>
}