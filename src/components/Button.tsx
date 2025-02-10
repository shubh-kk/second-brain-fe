// Generic button component 
import { ReactElement } from "react";

// Define button variants
type variantType = "primary" | "secondary";
interface ButtonProps {
    variant: variantType; // Button style variant
    text: string; // Button text
    startIcon?: ReactElement; // Optional icon to display
    onClick?: () => void; // Click event handler
    fullWidth?: boolean; // Full width option
    loading?: boolean; // Loading state
    disabled?: boolean; // Disabled state
}

// Define styles for button variants
const variantStyles = {
    "primary": "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-200",
    "secondary": "bg-white text-indigo-600 border border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 shadow-sm hover:shadow-md transition-all duration-200"
}

// Default button styles
const defaultStyles = "px-4 py-2 rounded-lg font-medium items-center text-sm"

// Button component definition
export const Button = ({ variant, onClick, text, startIcon, fullWidth, loading, disabled }: ButtonProps) => {
    return (
        <button 
            onClick={onClick} 
            className={`${variantStyles[variant]} ${defaultStyles} flex ${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? " opacity-45 " : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} 
            disabled={loading || disabled} // Disable button if loading or disabled
        >
            <div className="pr-2"> {startIcon}</div> {/* Display start icon */}
            {text} {/* Button text */}
        </button>
    );
}