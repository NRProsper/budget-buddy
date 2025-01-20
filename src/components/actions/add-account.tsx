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
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useCreateAccount } from "@/hooks/useAccounts";
import { z } from "zod";


const accountSchema = z.object({
    type: z.string().min(5, "Account type is required"),
    balance: z.number().min(500, "Balance must be a above 500"),
});

type AccountFormData = z.infer<typeof accountSchema>;

export default function AddAccount() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AccountFormData>({
        resolver: zodResolver(accountSchema),
    });

    const createAccountMutation = useCreateAccount();

    const onSubmit = async (data: AccountFormData) => {
        try {
            await createAccountMutation.mutateAsync({
                type: data.type,
                balance: data.balance,
            });
            toast.success("Account created successfully!");
            reset();
        } catch (error) {
            toast.error("Failed to create account. Please try again.");
            console.error("Error creating account:", error);
        }
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button className="flex flex-col items-center justify-center space-y-2 bg-blue-200 p-2 rounded-md">
                    <span className="font-bold">
                        <Wallet className="w-6 h-6" />
                    </span>
                    <span>Add account</span>
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add Account</DrawerTitle>
                    <DrawerDescription>
                        Add a new account to manage your finances.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Account Type</label>
                            <Input
                                {...register("type")}
                                placeholder="e.g., Savings"
                                className="w-full"
                            />
                            {errors.type && (
                                <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Initial Balance</label>
                            <Input
                                {...register("balance", { valueAsNumber: true })}
                                type="number"
                                placeholder="e.g., 1000"
                                className="w-full"
                            />
                            {errors.balance && (
                                <p className="text-sm text-red-500 mt-1">{errors.balance.message}</p>
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