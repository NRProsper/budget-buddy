'use client'

import {ReactNode} from "react";
import {AuthProvider} from "@/context/AuthContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";

const queryClient = new QueryClient();

export default function ({children}:{children: ReactNode}) {
    return(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastContainer position="top-center" />
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}