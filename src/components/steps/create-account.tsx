"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateAccount } from "@/hooks/useAccounts";
import { toast } from "react-toastify";
import {Loader2} from "lucide-react";

const accountSchema = z.object({
    type: z.string().min(1, "Account type is required"),
    initialBalance: z.number().min(500, "Initial balance must be 500 or above"),
});

type AccountFormValues = z.infer<typeof accountSchema>;

interface AccountCreationStepProps {
    onSubmit: (accountId: string) => void;
}

const AccountCreationStep = ({ onSubmit }: AccountCreationStepProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AccountFormValues>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            type: "",
            initialBalance: 0,
        },
    });

    const createAccountMutation = useCreateAccount();

    const onFormSubmit = async (data: AccountFormValues) => {
        try {
            const account = await createAccountMutation.mutateAsync({
                type: data.type,
                balance: data.initialBalance,
            });

            toast.success("Account created successfully!");

            if (!account.id) {
                throw new Error("Account ID is missing in the response.");
            }

            // Pass the account ID to the parent component
            onSubmit(account.id);
        } catch (error) {
            toast.error("Failed to create account. Please try again.");
            console.error("Account Creation Error:", error);
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4">Create Your Account</h2>
            <p className="text-gray-600 mb-6">
                Provide some basic details to create your account.
            </p>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="type">Account Type</Label>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="type"
                                placeholder="e.g., Personal Account"
                                className="w-full"
                            />
                        )}
                    />
                    {errors.type && (
                        <p className="text-sm text-red-500">{errors.type.message}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="initialBalance">Initial Balance</Label>
                    <Controller
                        name="initialBalance"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="initialBalance"
                                type="number"
                                placeholder="e.g., 1000"
                                className="w-full"
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                        )}
                    />
                    {errors.initialBalance && (
                        <p className="text-sm text-red-500">{errors.initialBalance.message}</p>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={createAccountMutation.isPending}>
                    {createAccountMutation.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </Button>
            </form>
        </>
    );
};

export default AccountCreationStep;