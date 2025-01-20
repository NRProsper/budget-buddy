"use client";

import Link from "next/link";
import React from "react";
import {Home, PieChart} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from "@/context/AuthContext";
import ExpenseDrawer from "@/components/actions/spend";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const links = [
        {
            title: "Home",
            icon: <Home className="w-6 h-6" />,
            path: "/dashboard",
        },
        {
            title: "Categories",
            icon: <PieChart className="w-6 h-6" />,
            path: "/categories",
        },
    ];

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <>
            {/* Top Navigation Bar */}
            <div className="sm:max-w-lg mx-auto fixed top-0 left-0 right-0 bg-white border-b z-50">
                <div className="px-10 py-2 flex justify-between items-center">
                    <Link href="/dashboard" className="text-blue-500 font-semibold text-2xl">
                        Budget 😉
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="/avatar.jpg" alt="User Avatar" />
                                <AvatarFallback className="text-gray-900 font-bold">
                                    {user?.firstName.substring(0, 1)}
                                    {user?.lastName.substring(0, 1)}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-10">{children}</div>

            {/* Bottom Navigation Bar */}
            <div className="sm:max-w-lg mx-auto fixed bottom-0 left-0 right-0 bg-white border-t z-50">
                <div className="flex justify-around items-center p-2">
                    {links.map((link, idx) => (
                        <React.Fragment key={idx}>
                            {/* Render the Link */}
                            <Link
                                href={link.path}
                                className={`flex flex-col items-center font-medium hover:font-semibold text-gray-600 hover:text-gray-900 ${
                                    pathname === link.path ? "text-blue-600 font-semibold" : ""
                                }`}
                            >
                                {React.cloneElement(link.icon, {
                                    className: `w-6 h-6 ${pathname === link.path ? "text-blue-600" : ""}`,
                                })}
                                <span
                                    className={`
                                        ${pathname === link.path ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"}
                                    `}
                                >
                                    {link.title}
                                </span>
                            </Link>

                            {idx === 0 && <ExpenseDrawer />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}