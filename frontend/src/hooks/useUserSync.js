import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { syncUser } from "../lib/api";

const useUserSync = () => {
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const {
        mutate: syncUserMutation,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: syncUser,
    });

    useEffect(() => {
        if (isSignedIn && user && !isPending && !isSuccess) {
            syncUserMutation({
                email: user.primaryEmailAddress.emailAddress,
                name: user.fullName || user.firstName,
                imageUrl: user.imageUrl,
            });
        }
    }, [isSignedIn, user, isPending, isSuccess]);

    return { isSync: isSuccess };
};

export default useUserSync;
