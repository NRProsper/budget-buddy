"use client";

import {CategoryDto} from "@/types";

interface CategorySelectionStepProps {
    selectedCategories: CategoryDto[];
    onCategorySelect: (category: CategoryDto) => void;
}

const CategorySelection = ({selectedCategories, onCategorySelect,}:CategorySelectionStepProps) => {

    const popularCategories = [
        { emoji: "🍔", name: "Food & Dining" },
        { emoji: "🚗", name: "Transportation" },
        { emoji: "🏠", name: "Housing" },
        { emoji: "🛒", name: "Groceries" },
        { emoji: "💊", name: "Health & Wellness" },
        { emoji: "👗", name: "Clothing" },
        { emoji: "🎮", name: "Entertainment" },
        { emoji: "✈️", name: "Travel" },
        { emoji: "📚", name: "Education" },
        { emoji: "💻", name: "Technology" },
        { emoji: "🐶", name: "Pets" },
        { emoji: "💡", name: "Utilities" },
        { emoji: "🎁", name: "Gifts" },
        { emoji: "🏋️", name: "Fitness" },
        { emoji: "🍿", name: "Movies" },
        { emoji: "🍷", name: "Drinks" },
        { emoji: "💄", name: "Beauty" },
        { emoji: "📱", name: "Mobile" },
        { emoji: "🚬", name: "Smoking" },
        { emoji: "🎉", name: "Parties" },
    ];

    return (
        <>
            <h2 className="text-xl font-bold mb-4">How do you like spending?</h2>
            <p className="text-gray-600 mb-6">
                Choose the categories that best represent your spending habits. You can always add more later.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {popularCategories.map((category, index) => (
                    <div
                        key={index}
                        onClick={() => onCategorySelect(category)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedCategories.some(
                                (cat) => cat.name === category.name && cat.emoji === category.emoji
                            )
                                ? "bg-blue-50 border-blue-500"
                                : "bg-white hover:bg-gray-50"
                        }`}
                    >
                        <div className="text-2xl mb-2">{category.emoji}</div>
                        <div className="text-sm font-medium">{category.name}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CategorySelection