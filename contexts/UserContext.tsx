import React, {createContext, useState, ReactNode} from "react";

interface User {
    username: string,
    email: string
}

// definimos os tipos de contexto
interface UserContextType {
    user: User | null,
    setUser: (user: User | null) => void
    clearUser: () => void
}
// criamos o contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const clearUser = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }