"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, CartProduct } from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (product: CartProduct) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "calalina-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const hasLoadedStorage = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      } finally {
        hasLoadedStorage.current = true;
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage.current) return;
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: CartProduct) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }, []);

  const increase = useCallback((id: string) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  }, []);

  const decrease = useCallback((id: string) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];
        if (item.quantity <= 1) return [];
        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems((current) => (current.length ? [] : current));
  }, []);

  const count = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      addItem,
      increase,
      decrease,
      remove,
      clear,
    }),
    [addItem, clear, count, decrease, increase, items, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
