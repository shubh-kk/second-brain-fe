import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Signup component for user registration
export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(); // Reference for username input
    const passwordRef = useRef<HTMLInputElement>(); // Reference for password input
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Function to handle signup
    async function signup() {
        try {
            const username = usernameRef.current?.value; // Get username value
            const password = passwordRef.current?.value; // Get password value
            
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });

            navigate("/signin"); // Redirect to signin page after successful signup
            alert("Signup Successful!"); // Notify user
        } catch (error: any) {
            alert(error.response?.data?.msg || "Signup failed. Please try again."); // Handle error
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
            <div className="bg-white rounded-2xl min-w-40 p-4 shadow-lg shadow-blue-200">
                <h1 className="flex justify-center font-semibold text-xl ">Signup</h1>
                <Input reference={usernameRef} placeHolder="Username" />
                <Input reference={passwordRef} placeHolder="Password" />
                <div className="flex justify-center pt-4 ">
                    <Button text="Signup" variant="primary" fullWidth={true} loading={false} onClick={signup} />
                </div>
            </div>
        </div>
    );
}