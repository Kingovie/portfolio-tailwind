export interface ScreenShot {
  src: string;
  caption: string;
  /** Screens too tall to show statically: a real screen-recording of the
   * Figma prototype (already framed, already looping) in place of a still. */
  video?: { mp4: string; webm?: string; poster?: string };
}

const p = (file: string) => `/projects/bringgoods-screens/${file}`;

export const buyerScreens: ScreenShot[] = [
  { src: p("buyer-01.png"), caption: "Welcome" },
  { src: p("buyer-02.png"), caption: "Sign up with phone" },
  { src: p("buyer-03.png"), caption: "Enter your name" },
  { src: p("buyer-04.png"), caption: "Set your location" },
  { src: p("buyer-05.png"), caption: "Browse categories" },
  { src: p("buyer-06.png"), caption: "Choose size & quantity" },
  { src: p("buyer-07.png"), caption: "Set your price" },
  { src: p("buyer-08.png"), caption: "Review order list" },
  {
    src: p("buyer-09.png"),
    caption: "Compare seller offers",
    video: {
      mp4: p("buyer-09.mp4"),
      webm: p("buyer-09.webm"),
      poster: p("buyer-09-poster.jpg"),
    },
  },
  { src: p("buyer-10.png"), caption: "Confirm order" },
  { src: p("buyer-11.png"), caption: "Track delivery live" },
  { src: p("buyer-12.png"), caption: "Rider has arrived" },
  { src: p("buyer-13.png"), caption: "Order delivered" },
  { src: p("buyer-14.png"), caption: "Send a gift" },
  { src: p("buyer-15.png"), caption: "Shop with a gift card" },
  { src: p("buyer-16.png"), caption: "Choose recipients" },
  { src: p("buyer-17.png"), caption: "Your wallet" },
  { src: p("buyer-18.png"), caption: "Refer & earn" },
];

export const sellerScreens: ScreenShot[] = [
  { src: p("seller-01.png"), caption: "Welcome, sellers" },
  { src: p("seller-02.png"), caption: "Sign up with phone" },
  { src: p("seller-03.png"), caption: "Create your account" },
  { src: p("seller-04.png"), caption: "Name your store" },
  { src: p("seller-05.png"), caption: "Get verified" },
  { src: p("seller-06.png"), caption: "Store verification needed" },
  { src: p("seller-07.png"), caption: "Verification requirements" },
  { src: p("seller-08.png"), caption: "Confirm store address" },
  { src: p("seller-09.png"), caption: "Capture your store" },
  { src: p("seller-10.png"), caption: "Store verified" },
  { src: p("seller-11.png"), caption: "Pick categories to sell" },
  { src: p("seller-12.png"), caption: "Before you import a category" },
  { src: p("seller-13.png"), caption: "Browse all categories" },
  { src: p("seller-14.png"), caption: "Choose tuber varieties" },
  { src: p("seller-15.png"), caption: "Importing to store" },
  { src: p("seller-16.png"), caption: "Add inventory item" },
  { src: p("seller-17.png"), caption: "Review incoming bids" },
  { src: p("seller-18.png"), caption: "Manage orders" },
  { src: p("seller-19.png"), caption: "AI inventory assistant" },
  { src: p("seller-20.png"), caption: "Store dashboard" },
];

export const riderScreens: ScreenShot[] = [
  { src: p("rider-01.png"), caption: "Welcome, riders" },
  { src: p("rider-02.png"), caption: "Verify your number" },
  { src: p("rider-03.png"), caption: "Enter your details" },
  { src: p("rider-04.png"), caption: "Set delivery preferences" },
  { src: p("rider-05.png"), caption: "Finish onboarding" },
  { src: p("rider-06.png"), caption: "Task list" },
  { src: p("rider-07.png"), caption: "New delivery request" },
  { src: p("rider-08.png"), caption: "Current assignment" },
  { src: p("rider-09.png"), caption: "Deliveries overview" },
  { src: p("rider-10.png"), caption: "Swipe to start pickup" },
  { src: p("rider-11.png"), caption: "Head to pickup" },
  { src: p("rider-12.png"), caption: "Confirm arrival at pickup" },
  { src: p("rider-13.png"), caption: "Waiting on seller" },
  { src: p("rider-14.png"), caption: "Confirm items received" },
  { src: p("rider-15.png"), caption: "Swipe to start drop-off" },
  { src: p("rider-16.png"), caption: "Head to drop-off" },
  { src: p("rider-17.png"), caption: "Confirm arrival at drop-off" },
  { src: p("rider-18.png"), caption: "Waiting on buyer" },
  { src: p("rider-19.png"), caption: "Delivery successful" },
];
