'use client'

import {useStatistics} from "@/hooks/useAccounts";
import {Skeleton} from "@/components/ui/skeleton";
import {Alert, AlertDescription} from "@/components/ui/alert";

export default function({accountId}: {accountId: string }) {

    const { data: statistics, isPending, error } = useStatistics(accountId);

    if (isPending) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-1/3" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Failed to load statistics: {error.message}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold capitalize">{statistics?.account.type} Statistics</h2>
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-100 border border-blue-400 rounded-md px-5 py-2">
                    <h4 className="text-2xl font-semibold">Balance</h4>
                    <h6>{statistics?.account.balance}</h6>
                </div>
                <div className="bg-green-100 border border-green-400 rounded-md px-5 py-2">
                    <h4 className="text-2xl font-semibold">Income</h4>
                    <h6>{statistics?.totalIncomes.toFixed(2)}</h6>
                </div>
                <div className="bg-red-100 border border-red-400 rounded-md px-5 py-2">
                    <h4 className="text-2xl font-semibold">Expence</h4>
                    <h6>{statistics?.totalExpenses.toFixed(2)}</h6>
                </div>
            </div>
        </div>
    );

}