import { useEffect, useState } from "react";
import type { IUser } from "../types/user.type";
import { createContext } from "react";
import { me } from "../services/auth.service";
import useToast from "../hooks/useToast";

interface IAuthContext {
    user: IUser | null;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);
    const { showError } = useToast()

    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
    };

    useEffect(() => {
        const fatchData = async () => {
            try {
                const user = await me();
                setUser(user);
            } catch (error: any) {
                console.error(error);
                showError(error?.response?.data?.message || "Something went wrong")
            }


        }

        fatchData();
    }, [])


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setLoading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;