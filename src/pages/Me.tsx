import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

// Me component to check user authentication
export function Me() {
    const navigate = useNavigate(); // Hook to programmatically navigate
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token"); // Get token from local storage
            
            if (!token) {
                navigate("/signup"); // Redirect to signup if no token
                return;
            }

            try {
                // Verify token with backend
                await axios.get(`${BACKEND_URL}/api/v1/me`, {
                    headers: {
                        "Authorization": token // Include token in headers
                    }
                });
                navigate("/dashboard"); // Redirect to dashboard if token is valid
            } catch (error) {
                localStorage.removeItem("token"); // Remove token if verification fails
                navigate("/signup"); // Redirect to signup
            }
        };

        checkAuth(); // Call authentication check
    }, [navigate]);

    return (
        // Loading Spinner
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
} 