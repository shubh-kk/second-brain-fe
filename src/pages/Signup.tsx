import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate() ;

    async function signup() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });

            navigate("/signin")
            alert("Signup Successful!");
        } catch (error: any) {
            alert(error.response?.data?.msg || "Signup failed. Please try again.");
        }
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded min-w-40 border p-4">
            <Input reference={usernameRef} placeHolder="Username" />
            <Input reference={passwordRef} placeHolder="Password" />
            <div className="flex justify-center pt-4 ">
                <Button text="Signup" variant="primary" fullWidth={true} loading={false} onClick={signup} />
            </div>
        </div>
    </div>
}