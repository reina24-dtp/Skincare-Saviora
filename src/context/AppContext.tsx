"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { AppState, AppContextType, Product, CartItem, WishlistItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const AppContext = createContext<AppContextType | undefined>(undefined);

type Action =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'TOGGLE_WISHLIST'; payload: { product: Product } }
  | { type: 'SET_STATE'; payload: AppState }
  | { type: 'CLEAR_CART' };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingItemIndex].quantity += quantity;
        return { ...state, cart: newCart };
      }
      return { ...state, cart: [...state.cart, { product, quantity }] };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload.productId),
      };
    }
    case 'UPDATE_CART_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    }
    case 'TOGGLE_WISHLIST': {
      const { product } = action.payload;
      const isInWishlist = state.wishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        return {
          ...state,
          wishlist: state.wishlist.filter(item => item.id !== product.id),
        };
      }
      return { ...state, wishlist: [...state.wishlist, product] };
    }
    case 'SET_STATE': {
      return action.payload;
    }
    case 'CLEAR_CART': {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

const getInitialState = (): AppState => {
  if (typeof window === 'undefined') {
    return { cart: [], wishlist: [] };
  }
  try {
    const storedState = localStorage.getItem('skincareSaviorState');
    return storedState ? JSON.parse(storedState) : { cart: [], wishlist: [] };
  } catch (error) {
    console.error('Failed to parse state from localStorage', error);
    return { cart: [], wishlist: [] };
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, { cart: [], wishlist: [] });
  const { toast } = useToast();

  useEffect(() => {
    dispatch({ type: 'SET_STATE', payload: getInitialState() });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('skincareSaviorState', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to localStorage', error);
    }
  }, [state]);

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name}`,
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleWishlist = (product: Product) => {
    const isInWishlist = state.wishlist.some(item => item.id === product.id);
    dispatch({ type: 'TOGGLE_WISHLIST', payload: { product } });
    toast({
      title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: product.name,
    });
  };

  const isInWishlist = (productId: string) => {
    return state.wishlist.some(item => item.id === productId);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
