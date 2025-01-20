"use client";

import {useState} from "react";
import TransactionGraph from "@/components/transaction-graph";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useAllTransactions} from "@/hooks/useTransactions";
import {Transaction} from "@/types";

export default function UserTransactions() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const { data: transactions, isPending, error } = useAllTransactions();


    const transformData = (transactions: Transaction[]) => {
        const groupedByDate: { [key: string]: { income: number; expenses: number } } = {};

        transactions.forEach((transaction) => {
            const date = new Date(transaction.createdAt).toISOString().split("T")[0];
            if (!groupedByDate[date]) {
                groupedByDate[date] = { income: 0, expenses: 0 };
            }

            if (transaction.type === "IN") {
                groupedByDate[date].income += transaction.amount;
            } else if (transaction.type === "OUT") {
                groupedByDate[date].expenses += transaction.amount;
            }
        });

        return Object.keys(groupedByDate).map((date) => ({
            date,
            income: groupedByDate[date].income,
            expenses: groupedByDate[date].expenses,
        }));
    };

    const graphData = transactions ? transformData(transactions) : [];

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };

    if (isPending) {
        return <div>Loading transactions...</div>;
    }

    if (error) {
        return <div>Error loading transactions: {error.message}</div>;
    }

    return (
        <div className="space-y-6 mt-5">
            <TransactionGraph data={graphData} onDateSelect={handleDateSelect} />

            {selectedDate && (
                <Card>
                    <CardHeader>
                        <CardTitle>Transactions for {selectedDate}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions
                                ?.filter(
                                    (transaction) =>
                                        new Date(transaction.createdAt).toISOString().split("T")[0] ===
                                        selectedDate
                                )
                                .map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="p-4 border rounded-lg bg-white"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">
                                                {transaction.type === "IN" ? "Income" : "Expense"}
                                            </span>
                                            <span
                                                className={`text-sm font-semibold ${
                                                    transaction.type === "IN"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {transaction.type === "IN" ? "+" : "-"} $
                                                {transaction.amount.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(transaction.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
