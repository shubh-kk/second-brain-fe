import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export function Me() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            
            if (!token) {
                navigate("/signup");
                return;
            }

            try {
                // Verify token with backend
                await axios.get(`${BACKEND_URL}/api/v1/me`, {
                    headers: {
                        "Authorization": token
                    }
                });
                navigate("/dashboard");
            } catch (error) {
                localStorage.removeItem("token");
                navigate("/signup");
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        // Loading Spinner
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
} 