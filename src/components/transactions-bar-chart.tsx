"use client";

import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface TransactionData {
    date: string;
    income: number;
    expenses: number;
}

interface TransactionBarChartProps {
    data: TransactionData[];
}


const chartConfig = {
    income: {
        label: "Income",
        color: "#30c566",
    },
    expenses: {
        label: "Expenses",
        color: "#f13e3e"
    },
} satisfies ChartConfig;

export function TransactionBarChart({ data }: TransactionBarChartProps) {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={data}>
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}