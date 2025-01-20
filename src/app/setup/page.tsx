"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProgressBar from "@/components/ui/progress-bar";
import AccountCreationStep from "@/components/steps/create-account";
import TopUpStep from "@/components/steps/top-up";
import CategorySelection from "@/components/steps/category-selection";
import WelcomeStep from "@/components/steps/welcome-step";
import { withAuth } from "@/components/with-auth";
import { CategoryDto } from "@/types";
import { useCreateCategory } from "@/hooks/useCategories";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const SetupPage = () => {
    const [step, setStep] = useState<number>(0);
    const [selectedCategories, setSelectedCategories] = useState<CategoryDto[]>([]);
    const [accountId, setAccountId] = useState<string | null>("");

    const createCategoryMutation = useCreateCategory();
    const router = useRouter();

    const handleAccountSubmit = (accountId: string) => {
        console.log("Account ID received:", accountId);
        setAccountId(accountId);
        handleNext();
    };

    const handleCategorySelect = (category: CategoryDto) => {
        if (
            selectedCategories.some(
                (cat) => cat.name === category.name && cat.emoji === category.emoji
            )
        ) {
            setSelectedCategories(
                selectedCategories.filter(
                    (cat) => cat.name !== category.name || cat.emoji !== category.emoji
                )
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleTopUpComplete = () => {
        handleNext();
    };

    const handleSubmit = async () => {
        try {
            if (!accountId) {
                throw new Error("Account ID is missing. Please create an account first.");
            }

            for (const category of selectedCategories) {
                await createCategoryMutation.mutateAsync(category);
            }

            toast.success("Setup completed successfully!");
            console.log("Setup Complete:", {
                selectedCategories,
                accountId,
            });

            router.push("/dashboard");

        } catch (error) {
            toast.error("An error occurred during setup. Please try again.");
            console.error("Setup Error:", error);
        }
    };

    return (
        <div>
            {step !== 0 && (
                <div className="flex justify-between items-center mb-4">
                    {step > 0 && (
                        <button
                            onClick={handleBack}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                    )}
                    {step < 3 && (
                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    )}
                </div>
            )}

            {step !== 0 && (
                <div className="mb-8">
                    <ProgressBar step={step} totalSteps={4} />
                </div>
            )}

            <div>
                {step === 0 && <WelcomeStep onclick={() => setStep(1)} />}
                {step === 1 && (
                    <CategorySelection
                        selectedCategories={selectedCategories}
                        onCategorySelect={handleCategorySelect}
                    />
                )}
                {step === 2 && (
                    <AccountCreationStep onSubmit={handleAccountSubmit} />
                )}
                {step === 3 && (
                    <TopUpStep categoryId={accountId} onTopUpComplete={handleTopUpComplete} />
                )}
            </div>

            {step === 3 && (
                <button
                    onClick={handleSubmit}
                    className="mt-8 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={createCategoryMutation.isPending}
                >
                    {createCategoryMutation.isPending
                        ? "Completing Setup..."
                        : "Finish Setup"}
                </button>
            )}
        </div>
    );
};

export default withAuth(SetupPage);