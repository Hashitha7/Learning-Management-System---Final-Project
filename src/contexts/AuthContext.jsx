import React, { createContext, useContext, useState } from 'react';
const mockUsers = {
    super_admin: { id: '1', name: 'Marcus Chen', email: 'marcus@lms.io', role: 'super_admin', school: 'EduPlatform Global' },
    admin: { id: '2', name: 'Sarah Williams', email: 'sarah@lincoln.edu', role: 'admin', school: 'Lincoln Academy' },
    teacher: { id: '3', name: 'Dr. James Carter', email: 'carter@lincoln.edu', role: 'teacher', school: 'Lincoln Academy' },
    student: { id: '4', name: 'Alex Rivera', email: 'alex@lincoln.edu', role: 'student', school: 'Lincoln Academy' },
};
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (role) => setUser(mockUsers[role]);
    const logout = () => setUser(null);
    return (<AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
