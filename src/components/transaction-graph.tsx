"use client";

import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TransactionData {
    date: string;
    income: number;
    expenses: number;
}

interface TransactionGraphProps {
    data: TransactionData[];
    onDateSelect: (date: string) => void;
}

export default function TransactionGraph({ data, onDateSelect }: TransactionGraphProps) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleBarClick = (event: any) => {
        if (event.activePayload) {
            const date = event.activePayload[0].payload.date;
            setSelectedDate(date);
            onDateSelect(date);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            onClick={handleBarClick}
                            margin={{ top: 20, right: 5, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="income" fill="#82ca9d" name="Income" />
                            <Bar dataKey="expenses" fill="#ff6b6b" name="Expenses" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {selectedDate && (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Selected Date: <span className="font-semibold">{selectedDate}</span>
                        </p>
                        <Button
                            variant="outline"
                            className="mt-2"
                            onClick={() => setSelectedDate(null)}
                        >
                            Clear Selection
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}