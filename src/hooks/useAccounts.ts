import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createAccount,
    deleteAccount,
    getAccountById,
    getAllAccounts, getStatistics,
    spendFromAccount,
    topUpAccount
} from "@/api/accounts";
import {Account, CreateAccount, ExpenseRequest, TopupRequest} from "@/types";


export const useAccounts = () => {
    return useQuery<Account[], Error>({
        queryKey: ["accounts"],
        queryFn: () => getAllAccounts(),
    });
};


export const useAccount = (accountId: string) => {
    return useQuery<Account, Error>({
        queryKey: ["account", accountId],
        queryFn: () => getAccountById(accountId),
        enabled: !!accountId,
    });
};


export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    return useMutation<Account, Error, CreateAccount>({
        mutationFn: (accountData) => createAccount(accountData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
    });
};


export const useDeleteAccount = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (accountId) => deleteAccount(accountId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
    });
};

export const useStatistics = (accountId: string) => {
    return useQuery({
        queryKey: ['statistics', accountId],
        queryFn: () => getStatistics(accountId)
    })
}

export const useTopUpAccount = (accountId: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, TopupRequest>({
        mutationFn: (topupData) => topUpAccount(accountId, topupData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["account", accountId] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
    });
};


export const useSpendFromAccount = (accountId: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, ExpenseRequest>({
        mutationFn: (expenseData) => spendFromAccount(accountId, expenseData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["account", accountId] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
    });
};