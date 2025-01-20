'use client'

import React, {useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

export const withAuth = (Component: () => (JSX.Element)) => {
    return function ProtectedRoute(props: any) {
        const { isAuthenticated } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push("/login");
            }
        }, [isAuthenticated, router]);


        return isAuthenticated ? <Component {...props} /> : null;
    };
};