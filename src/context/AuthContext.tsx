import { SafeUser } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAccounts } from "@/hooks/useAccounts";
import { useRouter } from "next/navigation";

interface AuthContextType {
    isAuthenticated: boolean;
    user: SafeUser | null;
    token: string | null;
    login: (token: string, user: SafeUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<SafeUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const { data: accounts } = useAccounts();
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setIsAuthenticated(true);
            setToken(storedToken);
            setUser(JSON.parse(storedUser));


            if (accounts && accounts.length === 0) {
                router.push("/setup");
            } else {
                const currentPath = window.location.pathname;
                if (currentPath === "/login" || currentPath === "/setup") {
                    router.push("/dashboard");
                } else {
                    router.push(currentPath);
                }
            }
        }
    }, [accounts, router]);

    const login = (token: string, user: SafeUser) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};