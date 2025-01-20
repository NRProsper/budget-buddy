"use client";

import React from "react";
import {useTopUpAccount} from "@/hooks/useAccounts";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "react-toastify";

interface TopUpStepProps {
    categoryId: string;
    onTopUpComplete: () => void;
}


const topUpSchema = z.object({
    amount: z.number().min(500, "Minimum top-up amount is 500"),
});

type TopUpFormData = z.infer<typeof topUpSchema>;

const TopUpStep = ({ categoryId, onTopUpComplete }: TopUpStepProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TopUpFormData>({
        resolver: zodResolver(topUpSchema),
    });

    const topUpAccountMutation = useTopUpAccount(categoryId);

    const onSubmit = async (data: TopUpFormData) => {
        try {
            if (!categoryId) {
                throw new Error("Category ID is missing. Please select a category first.");
            }

            await topUpAccountMutation.mutateAsync({
                amount: data.amount,
            });

            toast.success("Top-up completed successfully!");
            onTopUpComplete();
        } catch (error) {
            toast.error("An error occurred during top-up. Please try again.");
            console.error("Top-up Error:", error);
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4">Top Up Your Account</h2>
            <p className="text-gray-600 mb-6">
                Add an initial balance to your account to get started.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <Input
                        type="number"
                        {...register("amount", { valueAsNumber: true })}
                        placeholder="e.g., 500"
                        className="w-full"
                    />
                    {errors.amount && (
                        <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="mt-8 w-full"
                    disabled={topUpAccountMutation.isPending}
                >
                    {topUpAccountMutation.isPending ? "Topping Up..." : "Top Up"}
                </Button>
            </form>
        </>
    );
};

export default TopUpStep;