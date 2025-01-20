'use client'

import {useAccounts} from "@/hooks/useAccounts";
import Link from "next/link";
import {withAuth} from "@/components/with-auth";
import AddCategory from "@/components/actions/add-category";
import AddAccount from "@/components/actions/add-account";
import TopUp from "@/components/actions/topup";
import UserTransactions from "@/components/user-transactions";

const Dashboard = () => {
    const { data: accounts, isPending, error } = useAccounts();

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="text-gray-600">
            <h1 className="text-2xl font-bold mb-6">Your Accounts</h1>

            {accounts && accounts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {accounts.map((account, idx) => (
                        <Link href={`/accounts/${account.id}`} key={account.id}
                              className={`p-4 border rounded-lg shadow-sm ${
                                  accounts.length % 2 !== 0 && idx === accounts.length - 1 ? "col-span-2" : ""
                              }`}>
                            <h1 className="font-bold mb-2">{account.type}</h1>
                            <p className="text-gray-600">Balance: {account.balance}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-gray-600 mb-4">You don't have any accounts yet.</p>
                    <Link
                        href="/create-account"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Create an Account
                    </Link>
                </div>
            )}

            <p className="flex items-center gap-2 my-5 text-center">
                <span className="text-4xl">⚠️</span>
                <span>Click on each account to get more info</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ">
                <AddCategory/>
                <AddAccount/>
                <TopUp/>
            </div>

            <UserTransactions/>


        </div>
    );

}


export default withAuth(Dashboard);