import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const logoutTimerRef = useRef(null);

    const clearLogoutTimer = () => {
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
    };

    const scheduleAutoLogout = (decodedToken) => {
        clearLogoutTimer();
        if (!decodedToken.exp) return;

        const expiresInMs = decodedToken.exp * 1000 - Date.now();

        if (expiresInMs <= 0) {
            logout();
            return;
        }

        logoutTimerRef.current = setTimeout(() => {
            logout();
        }, expiresInMs);
    };

    const isTokenExpired = (decodedToken) => {
        if (!decodedToken.exp) return false;
        return decodedToken.exp * 1000 <= Date.now();
    };

    const updateUserFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);

            if (isTokenExpired(decodedToken)) {
                localStorage.removeItem('token');
                setUser(null);
                return;
            }

            let nom = decodedToken.nom || "";
            let role = decodedToken.role || "";
            setUser({
                nom: nom,
                role: role
            });

            scheduleAutoLogout(decodedToken);
        } catch (err) {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            updateUserFromToken(token);
        }
        setLoading(false);

        return () => clearLogoutTimer();
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        updateUserFromToken(token);
    };

    const logout = () => {
        clearLogoutTimer();
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};