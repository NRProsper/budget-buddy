"use client";

import {useTransactions} from "@/hooks/useTransactions";
import {format} from "date-fns";
import Pagination from "@/components/pagination";

export default function AccountTransactions({ accountId }: { accountId: string }) {
    const { data: transactionsResponse, isPending, error } = useTransactions(accountId);

    if (isPending) {
        return <div>Loading transactions...</div>;
    }

    if (error) {
        return <div>Error loading transactions: {error.message}</div>;
    }

    const { content: transactions, totalPages, number: currentPage } = transactionsResponse!;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-medium">Account Transactions</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                        <tr
                            key={transaction.id}
                            className={transaction.type === "IN" ? "bg-green-50" : "bg-red-50"}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-sm font-semibold rounded-full ${
                                            transaction.type === "IN"
                                                ? "text-green-800 bg-green-100"
                                                : "text-red-800 bg-red-100"
                                        }`}
                                    >
                                        {transaction.type}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`text-sm font-semibold ${
                                            transaction.type === "IN" ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {transaction.type === "IN" ? "+" : "-"} ${transaction.amount.toFixed(2)}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {format(new Date(transaction.createdAt), "MMM dd, yyyy hh:mm a")}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage+1}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </div>
    );
}