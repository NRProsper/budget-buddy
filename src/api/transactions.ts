import {Transaction, TransactionsResponse} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
import API from "@/lib/axios";

export const getAccountTransactions = async (
    accountId: string,
    page: number = 1,
    size: number = 10
): Promise<TransactionsResponse> => {
    try {
        const response: AxiosResponse<TransactionsResponse> = await API.get(
            `/transactions/${accountId}?page=${page}&size=${size}`
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to fetch transactions.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};


export const getAllTransactions = async ():Promise<Transaction[]> => {
    try{
        const response: AxiosResponse<Transaction[]> = await API.get('/transactions/all')
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to fetch transactions.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};