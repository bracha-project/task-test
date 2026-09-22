import { createContext } from 'react';

import type { LoginResponse } from '../types/auth';

export interface AuthContextValue {
    user: LoginResponse | null;
    login: (authResponse: LoginResponse) => void;
    logout: () => void;
}

export const AuthContext =
    createContext<AuthContextValue | undefined>(
        undefined
    );