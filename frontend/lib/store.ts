import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  shopify_id: string
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
  // UPDATED: Now returns a Promise for the API call
  getCheckoutUrl: () => Promise<string>
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

      // NEW: Professional cartCreate Handshake
      getCheckoutUrl: async () => {
        const items = get().items;
        if (items.length === 0) return "";

        const lines = items.map((item) => ({
          quantity: item.quantity,
          merchandiseId: item.shopify_id.includes("gid://")
            ? item.shopify_id
            : `gid://shopify/ProductVariant/${item.shopify_id}`
        }));

        const query = `
          mutation cartCreate($input: CartInput) {
            cartCreate(input: $input) {
              cart { checkoutUrl }
              userErrors { field message }
            }
          }
        `;

        try {
          const response = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2026-04/graphql.json`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN!,
            },
            body: JSON.stringify({ query, variables: { input: { lines } } }),
          });

          const result = await response.json();
          return result.data?.cartCreate?.cart?.checkoutUrl || "";
        } catch (error) {
          console.error("Cart API Error:", error);
          return "";
        }
      },
    }),
    { name: 'cart-storage' }
  )
)