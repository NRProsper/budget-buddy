import {useAuth} from "@/context/AuthContext";
import {useMutation} from "@tanstack/react-query";
import {LoginRequest, RegisterRequest} from "@/types";
import {login as apiLogin, register} from "@/api/auth";
import {useRouter} from "next/navigation";
import {useAccounts} from "@/hooks/useAccounts";
import {toast} from "react-toastify";


export const useRegister = () => {
    return useMutation({
        mutationFn: async (userData: RegisterRequest) => {
            return await register(userData);
        }
    })
}

export const useLogin = () => {
    const { login } = useAuth();
    const router = useRouter()
    const { refetch: refetchAccounts } = useAccounts();

    return useMutation({
        mutationFn: async (credentials:LoginRequest) => {
            const data = await apiLogin(credentials);
            const {  user, accessToken } = data;

            login(accessToken, user);

            return data;
        },
        onSuccess: async () => {
            const { data: accounts } = await refetchAccounts();

            if (accounts && accounts.length === 0) {
                router.push("/setup");
            } else {
                router.push("/dashboard");
            }

            toast.success("Login successful!");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Login failed. Please try again.");
        },
    });
}

export const useLogout = () => {
    const { logout } = useAuth();
    logout();
}