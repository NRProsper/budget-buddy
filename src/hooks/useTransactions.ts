import {useQuery} from "@tanstack/react-query";
import {Transaction, TransactionsResponse} from "@/types";
import {getAccountTransactions, getAllTransactions} from "@/api/transactions";

export const useTransactions = (accountId: string, page: number = 1, size: number = 10) => {
    return useQuery<TransactionsResponse, Error>({
        queryKey: ["transactions", accountId, page, size],
        queryFn: () => getAccountTransactions(accountId, page, size)
    });
}


export const useAllTransactions = () => {
    return useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: () => getAllTransactions()
    })
}