import {Account, AccountStatistics, CreateAccount, ExpenseRequest, TopupRequest} from "@/types";
import {AxiosError, AxiosResponse} from "axios";
import API from "@/lib/axios";

export const getAllAccounts = async (): Promise<Account[]> => {
    try {
        const response: AxiosResponse<Account[]> = await API.get("/accounts");
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to fetch accounts.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const getAccountById = async (accountId: string): Promise<Account> => {
    try {
        const response: AxiosResponse<Account> = await API.get(`/accounts/${accountId}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to fetch account.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const createAccount = async (account: CreateAccount): Promise<Account> => {
    try {
        const response: AxiosResponse<Account> = await API.post("/accounts", account);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to create account.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const deleteAccount = async (accountId: string): Promise<void> => {
    try {
        await API.delete(`/accounts/${accountId}`);
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to delete account.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const topUpAccount = async (accountId: string, topupData: TopupRequest): Promise<void> => {
    try {
        await API.post(`/accounts/${accountId}/top-up`, topupData);
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to top up account.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const spendFromAccount = async (accountId: string, expenseData: ExpenseRequest): Promise<void> => {
    try {
        await API.post(`/accounts/${accountId}/spend`, expenseData);
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to record expense.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const getStatistics = async (accountId: string): Promise<AccountStatistics> => {
    try {
        const response: AxiosResponse<AccountStatistics> = await API.get(`/accounts/${accountId}/statistics`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to get statistics.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};