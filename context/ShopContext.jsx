'use client';

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// ─── Initial state ────────────────────────────────────────────────────────────
const initialState = {
  cart: [],       // [{ id, productId, name, size, grade, price, mrp, image, quantity }]
  wishlist: [],   // [{ id, name, grade, image, options, desc }]
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function shopReducer(state, action) {
  switch (action.type) {

    // CART
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

    // WISHLIST
    case 'WISH_TOGGLE': {
      const { product } = action;
      const inWish = state.wishlist.some((w) => w.id === product.id);
      return {
        ...state,
        wishlist: inWish
          ? state.wishlist.filter((w) => w.id !== product.id)
          : [...state.wishlist, product],
      };
    }

    case 'WISH_REMOVE':
      return { ...state, wishlist: state.wishlist.filter((w) => w.id !== action.id) };

    case 'WISH_CLEAR':
      return { ...state, wishlist: [] };

    case 'WISH_SET':
      return { ...state, wishlist: action.wishlist };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('to_cart') || '[]');
      const savedWishlist = JSON.parse(localStorage.getItem('to_wishlist') || '[]');
      if (savedCart.length) dispatch({ type: 'CART_SET', cart: savedCart });
      if (savedWishlist.length) dispatch({ type: 'WISH_SET', wishlist: savedWishlist });
    } catch { /* ignore */ }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('to_cart', JSON.stringify(state.cart));
    } catch { /* ignore */ }
  }, [state.cart]);

  useEffect(() => {
    try {
      localStorage.setItem('to_wishlist', JSON.stringify(state.wishlist));
    } catch { /* ignore */ }
  }, [state.wishlist]);

  // ── Cart helpers ────────────────────────────────────────────────
  const addToCart = useCallback((item) => dispatch({ type: 'CART_ADD', item }), []);
  const removeFromCart = useCallback((id) => dispatch({ type: 'CART_REMOVE', id }), []);
  const updateCartQty = useCallback((id, qty) => dispatch({ type: 'CART_UPDATE_QTY', id, qty }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CART_CLEAR' }), []);

  // ── Wishlist helpers ────────────────────────────────────────────
  const toggleWishlist = useCallback((product) => dispatch({ type: 'WISH_TOGGLE', product }), []);
  const removeFromWishlist = useCallback((id) => dispatch({ type: 'WISH_REMOVE', id }), []);
  const clearWishlist = useCallback(() => dispatch({ type: 'WISH_CLEAR' }), []);
  const isWishlisted = useCallback((id) => state.wishlist.some((w) => w.id === id), [state.wishlist]);

  // ── Computed ────────────────────────────────────────────────────
  const cartCount = state.cart.reduce((sum, c) => sum + c.quantity, 0);
  const cartTotal = state.cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const wishlistCount = state.wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        cart: state.cart,
        wishlist: state.wishlist,
        cartCount,
        cartTotal,
        wishlistCount,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlisted,
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

