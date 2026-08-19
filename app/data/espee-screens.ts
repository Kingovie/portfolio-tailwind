export interface ScreenShot {
  /** Absent until the real export lands — the slot renders as a placeholder. */
  src?: string;
  /** Bold line in the caption overlay. */
  title: string;
  /** Supporting line under the title. */
  caption: string;
}

const p = (file: string) => `/projects/espee-screens/${file}`;

// Same treatment as the Cribstock purchase flow: full-width, uncropped, one
// per row. Drop a `src` on a slot as each export arrives.
export const buyerScreens: ScreenShot[] = [
  {
    src: p("buyer-01.png"),
    title: "Landing page — new visitor",
    caption: "Categories, trending products, and daily deals before you ever sign in.",
  },
  {
    src: p("buyer-02.png"),
    title: "Landing page — registered user",
    caption: "Espee balance in the header, add-to-cart inline, and recently viewed items.",
  },
  {
    src: p("buyer-03.png"),
    title: "Product details",
    caption: "Specs, delivery estimate, return policy, and warranty before adding to cart.",
  },
  {
    src: p("buyer-04.png"),
    title: "Cart",
    caption: "Review items, adjust quantities, and see the running total in Espees.",
  },
  {
    src: p("buyer-05.png"),
    title: "Checkout",
    caption: "Delivery address, Espee Wallet payment, and a full order summary.",
  },
  {
    src: p("buyer-06.png"),
    title: "Espee Wallet",
    caption: "Balance, funding, and a full transaction history in SPS.",
  },
  {
    src: p("buyer-07.png"),
    title: "Order history",
    caption: "Ongoing, delivered, and cancelled orders — with rating once delivered.",
  },
  {
    src: p("buyer-08.png"),
    title: "Saved items",
    caption: "Everything held for later, ready to move into the cart.",
  },
];

export const sellerScreens: ScreenShot[] = [
  {
    src: p("seller-01.png"),
    title: "Seller homepage",
    caption: "Store performance, active orders, and what needs attention today.",
  },
  {
    src: p("seller-05.png"),
    title: "All orders",
    caption: "Incoming orders to accept, prepare, and hand over for fulfillment.",
  },
  {
    src: p("seller-06.png"),
    title: "Order details",
    caption: "Line items, buyer delivery info, and the fulfillment handover step.",
  },
  {
    src: p("seller-02.png"),
    title: "Inventory",
    caption: "Every product, its stock level, and its status in one list.",
  },
  {
    src: p("seller-03.png"),
    title: "Add a product",
    caption: "Product details, images, and category — the listing itself.",
  },
  {
    src: p("seller-04.png"),
    title: "Set pricing",
    caption: "Price in Espees, available quantity, and variant options.",
  },
];
