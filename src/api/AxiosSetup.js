import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {setupAxiosInterceptors} from "./axiosInstance.js";

const AxiosSetup = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setupAxiosInterceptors(navigate);
    }, [navigate]);

    return children;
};

export default AxiosSetup;