import AccountDetails from "@/components/account-details";
import AccountTransactions from "@/components/account-transactions";

type PageProps = {
    params: Promise<{
        [x: string]: string; id: string
    }>
}

export default async function AccountDetailsPage(params: PageProps) {
    const pgParams = await params;
    return(
        <div className="text-gray-600">
            <AccountDetails accountId={(await pgParams.params).id}/>
            <AccountTransactions accountId={(await pgParams.params).id} />
        </div>
    )
}