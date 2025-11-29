export type SkinType = "oily" | "dry" | "sensitive" | "combination";
export type SkinConcern = "acne" | "dullness" | "aging" | "dark spots" | "large pores";
export type ProductCategory = "cleanser" | "toner" | "serum" | "moisturizer" | "sunscreen" | "mask" | "face oil" | "exfoliant" | "eye cream";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  ingredients: string[];
  howToUse: string;
  price: number;
  image: string; // Corresponds to an ID in placeholder-images.json
  brand: string;
  category: ProductCategory;
  skinTypes: SkinType[];
  skinConcerns: SkinConcern[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type WishlistItem = Product;

export type AppState = {
  cart: CartItem[];
  wishlist: WishlistItem[];
};

export type AppContextType = {
  state: AppState;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
};
