import AccountDetails from "@/components/account-details";
import AccountTransactions from "@/components/account-transactions";

export default async function AccountDetailsPage({ params }: { params: { id: string } }) {
    return(
        <div className="text-gray-600">
            <AccountDetails accountId={params.id}/>
            <AccountTransactions accountId={params.id} />
        </div>
    )
}