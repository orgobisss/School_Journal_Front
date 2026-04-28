import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '../data/mockData';

interface UserContextType {
  currentUser: User;
  setUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const getUserByRole = (role: UserRole): User => {
  switch (role) {
    case 'student':
      return {
        id: '1',
        name: 'Иван Петров',
        role: 'student',
        class: '3А',
      };
    case 'parent':
      return {
        id: 'p1',
        name: 'Ольга Сергеевна',
        role: 'parent',
        class: '3А',
      };
    case 'teacher':
      return {
        id: 't1',
        name: 'Мария Ивановна',
        role: 'teacher',
      };
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    return getUserByRole(savedRole || 'student');
  });

  const setUserRole = (role: UserRole) => {
    localStorage.setItem('userRole', role);
    setCurrentUser(getUserByRole(role));
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    if (savedRole) {
      setCurrentUser(getUserByRole(savedRole));
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
