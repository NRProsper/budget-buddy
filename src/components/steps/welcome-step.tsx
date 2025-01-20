'use client'

import {Button} from "@/components/ui/button";

export default function WelcomeStep({onclick}:{onclick: () => void}) {
    return (
        <div className="text-center">

            <h1 className="text-2xl font-bold mb-4 flex flex-col">
                <span>Welcome to</span>
                <span className="text-3xl">💰BudgetBuddy!💰</span>
            </h1>

            <p className="text-gray-600 mb-6">
                Your journey to smarter spending starts here! 🚀
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">What You'll Get 🎁</h2>
                <ul className="space-y-2 text-left">
                    <li className="flex items-center">
                        <span className="mr-2">📊</span>Track your expenses like a pro!
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">💡</span>Get insights to save more money!
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">🎯</span>Set goals and crush them!
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">📅</span>Plan your budget month by month!
                    </li>
                </ul>
            </div>


            <p className="text-gray-600 mb-8">
                Ready to take control of your finances? Setup you account now! 🚀
            </p>

            <div className="text-4xl mb-8 animate-bounce">
                👇
            </div>

            <Button size="lg" onClick={onclick}>Setup account</Button>

        </div>
    );
}