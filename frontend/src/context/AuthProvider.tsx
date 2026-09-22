import {
    useState,
    type ReactNode,
} from 'react';

import { AuthContext } from './AuthContext';
import type { LoginResponse } from '../types/auth';

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] =
        useState<LoginResponse | null>(() => {
            const storedUser =
                sessionStorage.getItem('auth');

            if (!storedUser) {
                return null;
            }

            try {
                return JSON.parse(storedUser);
            } catch {
                sessionStorage.removeItem('auth');
                return null;
            }
        });

    const login = (
        authResponse: LoginResponse
    ) => {
        setUser(authResponse);

        sessionStorage.setItem(
            'auth',
            JSON.stringify(authResponse)
        );
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}