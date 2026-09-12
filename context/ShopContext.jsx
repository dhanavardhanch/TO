'use client';

import { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';

// ─── Initial state ────────────────────────────────────────────────────────────
const initialState = {
  cart: [],       // [{ id, productId, name, size, grade, price, mrp, image, quantity }]
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function shopReducer(state, action) {
  switch (action.type) {
    case 'CART_ADD': {
      const { item } = action;
      const existing = state.cart.find((c) => c.id === item.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + (item.quantity || 1) } : c
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...item, quantity: item.quantity || 1 }] };
    }

    case 'CART_REMOVE':
      return { ...state, cart: state.cart.filter((c) => c.id !== action.id) };

    case 'CART_UPDATE_QTY':
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.id ? { ...c, quantity: Math.max(1, action.qty) } : c
        ),
      };

    case 'CART_CLEAR':
      return { ...state, cart: [] };

    case 'CART_SET':
      return { ...state, cart: action.cart };

    default:
      return state;
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────
export const COINS_PER_ORDER = 100;      // 100 Coins per delivered order
export const COINS_VALUE_RUPEES = 10;    // 100 Coins = Rs.10 (1 coin = Rs.0.10)
export const REDEEM_THRESHOLD = 5000;    // 5,000 Coins needed to redeem
export const REDEEM_DISCOUNT = 500;      // 5,000 Coins = Rs.500 flat discount

// ─── Context ──────────────────────────────────────────────────────────────────
const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const [coins, setCoins] = useState(100); // 100 initial welcome coins
  const [isCoinsModalOpen, setIsCoinsModalOpen] = useState(false);
  const [isCoinsRedeemed, setIsCoinsRedeemed] = useState(false);

  const [transactions, setTransactions] = useState([]);

  // Hydrate cart, coins & transactions from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('to_cart') || '[]');
      if (savedCart.length) dispatch({ type: 'CART_SET', cart: savedCart });
      const savedCoins = localStorage.getItem('to_coins');
      if (savedCoins !== null) {
        setCoins(Number(savedCoins));
      } else {
        localStorage.setItem('to_coins', '100');
      }
      const savedTxns = JSON.parse(localStorage.getItem('to_transactions') || 'null');
      if (savedTxns && savedTxns.length) {
        setTransactions(savedTxns);
      } else {
        const initialTxn = [
          {
            id: 'TXN-WLC-01',
            orderId: 'WELCOME-GIFT',
            title: 'Welcome Reward',
            desc: 'New account activation credit',
            type: 'credit',
            amount: 100,
            status: 'Delivered',
            date: '12 Sep 2026',
          },
        ];
        setTransactions(initialTxn);
        localStorage.setItem('to_transactions', JSON.stringify(initialTxn));
      }
    } catch { /* ignore */ }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('to_cart', JSON.stringify(state.cart));
    } catch { /* ignore */ }
  }, [state.cart]);

  // Persist coins to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('to_coins', String(coins));
    } catch { /* ignore */ }
  }, [coins]);

  // Persist transactions to localStorage
  useEffect(() => {
    try {
      if (transactions.length) {
        localStorage.setItem('to_transactions', JSON.stringify(transactions));
      }
    } catch { /* ignore */ }
  }, [transactions]);

  // ── Coin helpers with transaction logging ────────────────────────
  const addCoins = useCallback((amount = COINS_PER_ORDER, orderId = null) => {
    setCoins((prev) => prev + amount);
    const assignedId = orderId || `TO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTxn = {
      id: `TXN-${Date.now()}`,
      orderId: assignedId,
      title: orderId ? `Order #${assignedId} Delivered` : 'Delivered Order Reward',
      desc: '100 Original Coins credited upon delivery',
      type: 'credit',
      amount,
      status: 'Delivered',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setTransactions((prev) => [newTxn, ...prev]);
  }, []);

  const redeemCoins = useCallback((orderId = null) => {
    if (coins >= REDEEM_THRESHOLD) {
      setCoins((prev) => Math.max(0, prev - REDEEM_THRESHOLD));
      setIsCoinsRedeemed(true);
      const assignedId = orderId || `TO-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTxn = {
        id: `TXN-${Date.now()}-RED`,
        orderId: assignedId,
        title: `Voucher Redeemed (#${assignedId})`,
        desc: '5,000 Original Coins redeemed for ₹500 discount',
        type: 'debit',
        amount: -REDEEM_THRESHOLD,
        status: 'Redeemed',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      setTransactions((prev) => [newTxn, ...prev]);
      return true;
    }
    return false;
  }, [coins]);

  const toggleRedeemCoins = useCallback(() => {
    if (coins >= REDEEM_THRESHOLD) {
      setIsCoinsRedeemed((prev) => !prev);
    }
  }, [coins]);

  // ── Cart helpers ────────────────────────────────────────────────
  const addToCart = useCallback((item) => dispatch({ type: 'CART_ADD', item }), []);
  const removeFromCart = useCallback((id) => dispatch({ type: 'CART_REMOVE', id }), []);
  const updateCartQty = useCallback((id, qty) => dispatch({ type: 'CART_UPDATE_QTY', id, qty }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CART_CLEAR' }), []);

  // ── Computed ────────────────────────────────────────────────────
  const cartCount = state.cart.reduce((sum, c) => sum + c.quantity, 0);
  const cartTotal = state.cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const coinsValue = Math.round(coins * 0.1); // 100 coins = Rs.10
  const canRedeemCoins = coins >= REDEEM_THRESHOLD;
  const coinsNeededForRedeem = Math.max(0, REDEEM_THRESHOLD - coins);
  const progressPercent = Math.min(100, Math.round((coins / REDEEM_THRESHOLD) * 100));

  return (
    <ShopContext.Provider
      value={{
        cart: state.cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        // Original Coins wallet & transactions
        coins,
        coinsValue,
        canRedeemCoins,
        coinsNeededForRedeem,
        progressPercent,
        transactions,
        addCoins,
        redeemCoins,
        isCoinsRedeemed,
        setIsCoinsRedeemed,
        toggleRedeemCoins,
        isCoinsModalOpen,
        setIsCoinsModalOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside ShopProvider');
  return ctx;
}
