import {LoginRequest, LoginResponse, RegisterRequest, SafeUser} from "@/types";
import API from "@/lib/axios";
import {AxiosError, AxiosResponse} from "axios";

export const login = async (userData: LoginRequest): Promise<LoginResponse> => {
    try {
        const response: AxiosResponse<LoginResponse> = await API.post("/auth/login", userData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {

            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
}

export const register = async (userData: RegisterRequest): Promise<SafeUser> => {
    try{
        const response: AxiosResponse<SafeUser> = await API.post("/auth/sign-up", userData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {

            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
}
