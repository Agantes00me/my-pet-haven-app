import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  shopify_id: string // This MUST be the Shopify Variant ID
  title: string
  price: number
  image_url: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  // NEW: The "Handshake" function
  getCheckoutUrl: () => string
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          })
        } else {
          set({ items: [...currentItems, { ...item, quantity: 1 }] })
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
          ),
        }),
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),

      // NEW: Generate the Shopify Permalink
      getCheckoutUrl: () => {
        const items = get().items;
        if (items.length === 0) return "";

        // Format: variant_id:quantity,variant_id:quantity
        const cartString = items
          .map((item) => `${item.shopify_id}:${item.quantity}`)
          .join(",");

        // Redirects straight to your secure Shopify checkout
        return `https://gcrvj7-ea.myshopify.com/cart/${cartString}`;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)