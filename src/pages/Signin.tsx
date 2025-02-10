import axios from "axios";
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
                username,
                password
            });

            const jwt = response.data.token
            localStorage.setItem("token", jwt)
            navigate('/dashboard')
        } catch (error: any) {
            alert(error.response?.data?.msg || "Signup failed. Please try again.");
        }
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded min-w-40 border p-4">
            <h1 className="flex justify-center font-semibold text-xl ">Signin</h1>
            <Input reference={usernameRef} placeHolder="Username" />
            <Input reference={passwordRef} placeHolder="Password" />
            <div className="flex justify-center pt-4 ">
                <Button text="Signin" variant="primary" fullWidth={true} loading={false} onClick={signin} />
            </div>
        </div>
    </div>
}