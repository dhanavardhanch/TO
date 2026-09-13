'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, phone, email, isFirstLogin }
  const [coins, setCoins] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('to_user') || 'null');
      if (savedUser) {
        setUser(savedUser);
        const savedCoins = localStorage.getItem('to_coins');
        setCoins(savedCoins !== null ? Number(savedCoins) : 0);
        const savedTxns = JSON.parse(localStorage.getItem('to_transactions') || '[]');
        setTransactions(savedTxns);
      }
    } catch { /* ignore */ }
  }, []);

  // Persist coins when logged in
  useEffect(() => {
    if (user) {
      try { localStorage.setItem('to_coins', String(coins)); } catch { /* ignore */ }
    }
  }, [coins, user]);

  // Persist transactions
  useEffect(() => {
    if (user && transactions.length) {
      try { localStorage.setItem('to_transactions', JSON.stringify(transactions)); } catch { /* ignore */ }
    }
  }, [transactions, user]);

  const login = useCallback((credentials, fallbackName = '') => {
    let email = '';
    let phone = '';
    let name = '';

    if (typeof credentials === 'object' && credentials !== null) {
      email = credentials.email || '';
      phone = credentials.phone || '';
      name = credentials.name || '';
    } else if (typeof credentials === 'string') {
      if (credentials.includes('@')) {
        email = credentials;
      } else {
        phone = credentials;
      }
      name = fallbackName;
    }

    if (!name) {
      if (email) {
        const raw = email.split('@')[0].replace(/[._-]/g, ' ');
        name = raw.charAt(0).toUpperCase() + raw.slice(1);
      } else if (phone) {
        name = `User ${phone.slice(-4)}`;
      } else {
        name = 'The Original Member';
      }
    }

    const isNew = !localStorage.getItem('to_user');
    const userData = { name, phone, email, isFirstLogin: isNew };
    setUser(userData);
    try { localStorage.setItem('to_user', JSON.stringify(userData)); } catch { /* ignore */ }

    if (isNew) {
      // First login: grant 100 welcome coins
      const welcomeCoins = 100;
      setCoins(welcomeCoins);
      const welcomeTxn = {
        id: 'TXN-WLC-01',
        orderId: 'WELCOME',
        title: 'Welcome Bonus',
        desc: '100 Original Coins credited on first login',
        type: 'credit',
        amount: 100,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      setTransactions([welcomeTxn]);
    } else {
      const savedCoins = localStorage.getItem('to_coins');
      setCoins(savedCoins !== null ? Number(savedCoins) : 0);
      const savedTxns = JSON.parse(localStorage.getItem('to_transactions') || '[]');
      setTransactions(savedTxns);
    }
    setIsLoginModalOpen(false);
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      try { localStorage.setItem('to_user', JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCoins(0);
    setTransactions([]);
    try {
      localStorage.removeItem('to_user');
      localStorage.removeItem('to_coins');
      localStorage.removeItem('to_transactions');
    } catch { /* ignore */ }
  }, []);

  const addCoins = useCallback((amount = 86, orderId = null) => {
    setCoins((prev) => prev + amount);
    const id = orderId || `TO-${Math.floor(1000 + Math.random() * 9000)}`;
    const txn = {
      id: `TXN-${Date.now()}`,
      orderId: id,
      title: `Order #${id} Coins`,
      desc: `${amount} Original Coins credited`,
      type: 'credit',
      amount,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setTransactions((prev) => [txn, ...prev]);
  }, []);

  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      coins,
      transactions,
      login,
      logout,
      updateProfile,
      addCoins,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
