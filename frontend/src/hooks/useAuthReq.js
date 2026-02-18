import React, { useEffect } from "react";
import api from "../lib/axios";
import { useAuth } from "@clerk/clerk-react";

export default function useAuthReq() {
    console.log("useAuthReq");
    const { getToken, isSignedIn, isLoaded } = useAuth();
    // include the token to req headers
    useEffect(() => {
        const interceptor = api.interceptors.request.use(async (config) => {
            if (isSignedIn) {
                const token = await getToken();
                if (token) config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        return () => api.interceptors.request.eject(interceptor);
    }, [isSignedIn, getToken]);
    return { isSignedIn, isClerkLoaded: isLoaded };
}
