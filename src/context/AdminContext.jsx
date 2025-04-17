import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminInfo, setAdminInfo] = useState(null);

    return (
        <AdminContext.Provider value={{ adminInfo, setAdminInfo }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    return useContext(AdminContext);
}