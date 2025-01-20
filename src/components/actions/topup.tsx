"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {useAccounts, useTopUpAccount} from "@/hooks/useAccounts";
import {z} from "zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


const topUpSchema = z.object({
    accountId: z.string().min(1, "Account is required"),
    amount: z.number().min(500, "Amount must be greater than 500"),
});

type TopUpFormData = z.infer<typeof topUpSchema>;

export default function TopUpDrawer() {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TopUpFormData>({
        resolver: zodResolver(topUpSchema),
    });

    const { data: accounts, isPending, error } = useAccounts();


    const topUpAccountMutation = useTopUpAccount(watch("accountId"));

    const onSubmit = async (data: TopUpFormData) => {
        try {

            await topUpAccountMutation.mutateAsync({
                amount: data.amount,
            });
            toast.success("Top-up successful!");
            reset();
        } catch (error) {
            toast.error("Failed to top up. Please try again.");
            console.error("Error topping up:", error);
        }
    };

    if (isPending) {
        return <div>Loading accounts...</div>;
    }

    if (error) {
        return <div>Error loading accounts: {error.message}</div>;
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button className="flex flex-col items-center justify-center space-y-2 bg-blue-200 p-2 rounded-md">
                    <span className="font-bold">
                        <PlusCircle className="w-6 h-6" />
                    </span>
                    <span>Top up</span>
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Top Up Account</DrawerTitle>
                    <DrawerDescription>
                        Add funds to your account.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Select Account</label>
                            <Select
                                onValueChange={(value) => setValue("accountId", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an account" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts?.map((account) => (
                                        <SelectItem key={account.id} value={account.id}>
                                            {account.type} - ${account.balance.toFixed(2)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.accountId && (
                                <p className="text-sm text-red-500 mt-1">{errors.accountId.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Amount</label>
                            <Input
                                {...register("amount", { valueAsNumber: true })}
                                type="number"
                                placeholder="e.g., 100"
                                className="w-full"
                            />
                            {errors.amount && (
                                <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
                            )}
                        </div>
                        <DrawerFooter>
                            <Button type="submit">Submit</Button>
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}