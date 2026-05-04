import { useState, useEffect } from "react";

const slides = [
  { tag: "Limited time offer", title: "Festive Sale", desc: "Up to 20% off on Ladies Wear", btn: "Shop Now", badge: "20%", theme: "purple" },
  { tag: "New arrivals", title: "Summer Edit", desc: "Fresh styles for the season", btn: "Explore", badge: "NEW", theme: "blue" },
  { tag: "Exclusive deal", title: "Flash Sale", desc: "Up to 40% off — today only", btn: "Grab Now", badge: "40%", theme: "red" },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const goTo = (n) => setCurrent((n + slides.length) % slides.length);

  return (
    <div className="banner-wrap">
      {/* map slides, arrows, dots here */}
    </div>
  );
}