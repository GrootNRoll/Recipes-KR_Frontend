import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

// Интерфейс для пользователя
interface User {
  email: string;
  avatar?: string;
}

// Интерфейс для контекста аутентификации
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string) => boolean;
  changePassword: (email: string, currentPassword: string, newPassword: string) => boolean;
}

// Создаем контекст с начальным значением undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Моковые пользователи для демонстрации
const mockUsers = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
];

// Пропсы для AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Провайдер аутентификации
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  /**
   * Функция входа пользователя
   * @param email - email пользователя
   * @param password - пароль пользователя
   * @returns boolean - успешность входа
   */
  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser({ email });
      return true;
    }
    return false;
  };

  /**
   * Функция смены пароля
   * @param email - email пользователя
   * @param currentPassword - текущий пароль
   * @param newPassword - новый пароль
   * @returns boolean - успешность смены пароля
   */
  const changePassword = (email: string, currentPassword: string, newPassword: string): boolean => {
    // Проверяем валидность нового пароля
    if (newPassword.length < 8 || newPassword.length > 63) {
      return false;
    }

    const userIndex = mockUsers.findIndex(u => 
      u.email === email && u.password === currentPassword
    );
    
    if (userIndex >= 0) {
      mockUsers[userIndex].password = newPassword;
      return true;
    }
    return false;
  };

  /**
   * Функция регистрации нового пользователя
   * @param email - email нового пользователя
   * @param password - пароль нового пользователя
   * @returns boolean - успешность регистрации
   */
  const register = (email: string, password: string): boolean => {
    // Проверяем валидность пароля
    if (password.length < 8 || password.length > 63) {
      return false;
    }

    // Проверяем, нет ли уже пользователя с таким email
    if (mockUsers.some(u => u.email === email)) {
      return false;
    }

    // Добавляем нового пользователя
    mockUsers.push({ email, password });
    setUser({ email });
    return true;
  };

  /**
   * Функция выхода пользователя
   */
  const logout = (): void => {
    setUser(null);
  };

  // Значение контекста
  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    register,
    changePassword
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Хук для использования контекста аутентификации
 * @returns AuthContextType - контекст аутентификации
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};