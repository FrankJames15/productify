import React, { useEffect } from "react";
import api from "../lib/axios";
import { useAuth } from "@clerk/clerk-react";

/**
 * Installs an Axios request interceptor that attaches the Clerk auth token as an Authorization header on outgoing requests when the user is signed in, and removes the interceptor on cleanup.
 *
 * @returns {{ isSignedIn: boolean, isClerkLoaded: boolean }} An object containing the current signed-in status (`isSignedIn`) and whether Clerk has finished loading (`isClerkLoaded`).
 */
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
        return () => {
            api.interceptors.request.eject(interceptor);
        };
    }, [isSignedIn, getToken]);
    return { isSignedIn, isClerkLoaded: isLoaded };
}