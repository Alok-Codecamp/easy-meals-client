import Home from '@/components/home/Home';



export const metadata = {
  title: "EasyMeals - Fresh, Delicious, and Affordable Meals Delivered",
  description:
    "Welcome to EasyMeals — your go-to platform for finding, customizing, and ordering tasty meals from top-rated providers. Easy, fast, and satisfying!",
  keywords: [
    "meals",
    "food delivery",
    "EasyMeals",
    "home-cooked food",
    "order food online",
    "meal provider",
    "fresh meals",
    "affordable food",
  ],
  openGraph: {
    title: "EasyMeals - Fresh, Delicious, and Affordable Meals Delivered",
    description:
      "Discover your next favorite meal at EasyMeals. Search by provider, filter by rating, and enjoy fresh food delivered to your door.",
    url: "https://yourdomain.com",
    siteName: "EasyMeals",

    locale: "en_US",
    type: "website",
  },
};

const HomePage = () => {
  return (
    <div>
      <Home />
    </div>
  );
}

export default HomePage;
