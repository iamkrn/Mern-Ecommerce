import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Heart, Search, Menu, X, Star,
  ChevronRight, ArrowRight, Check, Truck, RefreshCw, Shield
} from "lucide-react";

/* ─── Google Fonts only – no other custom CSS ─── */
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

/* ─── DATA ─── */
const PRODUCTS = [
  { id: 1, name: "Linen Wrap Dress",       brand: "Zara",   price: 2499, mrp: 3999, rating: 4.7, reviews: 128, badge: "Bestseller", img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=500&q=80", img2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80" },
  { id: 2, name: "Slim-Fit Chinos",         brand: "H&M",    price: 1799, mrp: 2499, rating: 4.5, reviews: 94,  badge: "New",        img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80", img2: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80" },
  { id: 3, name: "Canvas Tote Bag",         brand: "Puma",   price: 999,  mrp: 1499, rating: 4.8, reviews: 312, badge: "Hot",        img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", img2: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80" },
  { id: 4, name: "Oversized Blazer",        brand: "Mango",  price: 3299, mrp: 4999, rating: 4.6, reviews: 67,  badge: "Limited",    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80", img2: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80" },
];

const CATEGORIES = [
  { label: "Women",      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80", count: "240+" },
  { label: "Men",        img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80", count: "180+" },
  { label: "Footwear",   img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", count: "95+"  },
  { label: "Bags",       img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", count: "60+"  },
  { label: "Accessories",img: "https://images.unsplash.com/photo-1588444650733-d0b11ad70ef4?w=400&q=80", count: "120+" },
];

const BRANDS   = ["Adidas","Nike","Puma","Reebok","Zara","H&M","Mango","Levi's"];
const FEATURES = [
  { icon: Truck,     title: "Free Delivery",    desc: "On orders above ₹999" },
  { icon: RefreshCw, title: "Easy Returns",     desc: "30-day hassle-free returns" },
  { icon: Shield,    title: "Secure Payments",  desc: "100% encrypted checkout" },
];

/* ─── HELPERS ─── */
const discount = (p, m) => Math.round(((m - p) / m) * 100);
const fmt      = (n)    => "₹" + n.toLocaleString("en-IN");

/* ─── TOAST ─── */
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, []);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 bg-stone-900 text-white text-sm px-5 py-3 rounded-full shadow-xl animate-bounce">
      <Check size={15} className="text-amber-400" /> {msg}
    </div>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({ product, onCart, onWishlist, wishlisted }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image */}
      <div
        className="relative overflow-hidden aspect-[3/4] cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={hovered ? product.img2 : product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
        />
        {/* Badge */}
        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full">
          {product.badge}
        </span>
        {/* Discount */}
        <span className="absolute top-3 right-12 bg-green-600 text-white text-[10px] font-medium px-2 py-1 rounded-full">
          -{discount(product.price, product.mrp)}%
        </span>
        {/* Wishlist */}
        <button
          onClick={() => onWishlist(product.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            size={15}
            className={wishlisted ? "fill-red-500 text-red-500" : "text-stone-400"}
          />
        </button>
        {/* Quick Add */}
        <button
          onClick={() => onCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-stone-900 text-white text-xs tracking-widest uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-amber-600"
        >
          Quick Add to Bag
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">{product.brand}</p>
        <h3 className="text-stone-800 font-medium text-sm mb-2 leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-stone-600 font-medium">{product.rating}</span>
          <span className="text-xs text-stone-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-stone-900 font-semibold text-base">{fmt(product.price)}</span>
            <span className="text-stone-400 text-xs line-through">{fmt(product.mrp)}</span>
          </div>
          <button
            onClick={() => onCart(product)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors duration-200"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function FashionLanding() {
  const [cartItems, setCartItems]     = useState([]);
  const [wishlist, setWishlist]       = useState([]);
  const [toast, setToast]             = useState(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [email, setEmail]             = useState("");
  const [subscribed, setSubscribed]   = useState(false);
  const [cartOpen, setCartOpen]       = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      return found
        ? prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });
    setToast(`"${product.name}" added to bag!`);
  };

  const toggleWishlist = (id) => {
    const added = !wishlist.includes(id);
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    setToast(added ? "Added to wishlist ♥" : "Removed from wishlist");
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return setToast("Please enter a valid email!");
    setSubscribed(true);
    setToast("You're subscribed! 🎉");
  };

  const navLinks = ["New In", "Women", "Men", "Brands", "Sale"];

  return (
    <>
      <style>{FONT_IMPORT}</style>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-stone-900 text-amber-400 text-center text-[11px] tracking-[0.18em] uppercase py-2.5 px-4">
        🚚 Free Delivery on orders above ₹999 &nbsp;·&nbsp; Use code <strong>STYLE20</strong> for 20% off
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-amber-50"}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <span className="text-2xl font-semibold text-stone-900 tracking-tight cursor-default"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            F<span className="text-amber-500">.</span>Mode
          </span>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l}>
                <a href="#" className={`text-[11px] tracking-[0.12em] uppercase font-medium transition-colors duration-200 ${l === "Sale" ? "text-red-500 hover:text-red-600" : "text-stone-600 hover:text-amber-600"}`}>
                  {l}
                </a>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-600">
              <Search size={17} />
            </button>
            <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-600 relative">
              <Heart size={17} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-semibold">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="flex w-9 h-9 items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-600 relative"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white text-[9px] rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden w-9 h-9 flex items-center justify-center text-stone-700"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-5 pb-5 pt-3 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l} href="#"
                className={`text-sm font-medium tracking-wide flex items-center justify-between ${l === "Sale" ? "text-red-500" : "text-stone-700"}`}
                onClick={() => setMobileOpen(false)}>
                {l} <ChevronRight size={15} className="text-stone-300" />
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[900]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <h2 className="text-lg font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Bag ({cartCount})
              </h2>
              <button onClick={() => setCartOpen(false)} className="text-stone-400 hover:text-stone-700"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-3">
                  <ShoppingBag size={40} strokeWidth={1} />
                  <p className="text-sm">Your bag is empty</p>
                  <button onClick={() => setCartOpen(false)}
                    className="text-xs uppercase tracking-widest text-amber-600 border border-amber-600 px-4 py-2 hover:bg-amber-600 hover:text-white transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img src={item.img} alt={item.name} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-stone-400 uppercase tracking-wider">{item.brand}</p>
                      <p className="text-sm font-medium text-stone-800 truncate" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</p>
                      <p className="text-sm font-semibold text-stone-900 mt-1">{fmt(item.price)} × {item.qty}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-400 transition-colors flex-shrink-0">
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-stone-100 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-semibold text-stone-900">{fmt(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-green-600">
                  <span>Delivery</span>
                  <span>{cartTotal >= 999 ? "FREE" : fmt(99)}</span>
                </div>
                <button className="w-full bg-stone-900 text-white py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-amber-600 transition-colors duration-300 font-medium">
                  Checkout — {fmt(cartTotal + (cartTotal >= 999 ? 0 : 99))}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="bg-amber-50 min-h-[calc(100vh-88px)] flex items-center relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute right-0 top-0 w-[55%] h-full bg-stone-100 rounded-l-[80px] hidden md:block" />

        <div className="max-w-7xl mx-auto px-5 md:px-10 w-full grid md:grid-cols-2 gap-10 items-center py-16 relative z-10">
          {/* Text */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-[11px] text-amber-600 uppercase tracking-[0.2em] font-medium">
              <span className="w-7 h-px bg-amber-500" /> New Season 2026
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-stone-900 leading-[1.07]"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Dress the<br />
              Way You <em className="italic text-amber-500">Feel.</em>
            </h1>
            <p className="text-stone-500 text-base leading-relaxed max-w-sm font-light">
              Premium fashion for every mood. Discover curated collections across 120+ brands — delivered to your doorstep.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setCartOpen(true)}
                className="bg-stone-900 text-white px-8 py-4 text-xs tracking-[0.15em] uppercase hover:bg-amber-600 transition-colors duration-300 flex items-center gap-2"
              >
                Shop Now <ArrowRight size={14} />
              </button>
              <button className="border border-stone-300 text-stone-700 px-8 py-4 text-xs tracking-[0.15em] uppercase hover:border-stone-800 hover:text-stone-900 transition-colors duration-200">
                View Lookbook
              </button>
            </div>
            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Free Returns", "COD Available", "Authentic Products"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-[11px] text-stone-500 bg-white border border-stone-200 rounded-full px-3 py-1.5">
                  <Check size={10} className="text-green-500" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center">
            <div className="relative w-[300px] md:w-[360px]">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&q=85"
                alt="Model in seasonal collection"
                className="w-full aspect-[3/4] object-cover rounded-3xl shadow-2xl"
              />
              {/* Floating price card */}
              <div className="absolute -left-10 bottom-20 bg-white rounded-2xl p-4 shadow-xl border border-stone-100 min-w-[140px]">
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">Today's Pick</p>
                <p className="text-sm font-semibold text-stone-900 mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>Linen Wrap Dress</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs text-stone-600">4.7 · 128 reviews</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-stone-900">₹2,499</span>
                  <button
                    onClick={() => addToCart(PRODUCTS[0])}
                    className="text-[10px] bg-amber-500 text-white px-2.5 py-1 rounded-full hover:bg-amber-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -right-4 top-10 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg">
                120+ Brands ✦
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ── */}
      <div className="bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-100">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 py-5 px-2 md:px-8">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">{title}</p>
                <p className="text-xs text-stone-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEW ARRIVALS ── */}
      <section className="bg-stone-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] text-amber-600 uppercase tracking-[0.2em] mb-2">Just Dropped</p>
              <h2 className="text-3xl md:text-4xl font-light text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                New Arrivals
              </h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-amber-600 transition-colors border-b border-stone-200 hover:border-amber-400 pb-0.5">
              View All <ArrowRight size={12} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PRODUCTS.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onCart={addToCart}
                onWishlist={toggleWishlist}
                wishlisted={wishlist.includes(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <p className="text-[10px] text-amber-600 uppercase tracking-[0.2em] mb-2">Browse</p>
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shop by Category
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2">
            {CATEGORIES.map((c) => (
              <div key={c.label} className="group relative flex-shrink-0 w-48 md:w-56 cursor-pointer">
                <div className="overflow-hidden rounded-2xl aspect-[3/4]">
                  <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent rounded-2xl" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{c.label}</p>
                  <p className="text-white/70 text-xs">{c.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="bg-stone-900 py-20 md:py-24 text-center px-5">
        <p className="text-amber-400 text-[11px] tracking-[0.2em] uppercase mb-4">Limited Time Offer</p>
        <h2 className="text-4xl md:text-6xl font-light text-white leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Up to <em className="text-amber-400 italic">50% Off</em><br />
          on Summer Collection
        </h2>
        <p className="text-stone-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Flat discounts on 500+ styles. Offer ends midnight. No code needed — discount applied at checkout.
        </p>
        <button
          onClick={() => setCartOpen(true)}
          className="bg-amber-500 text-white px-10 py-4 text-xs tracking-[0.18em] uppercase hover:bg-amber-400 transition-colors duration-200 font-medium"
        >
          Shop the Sale
        </button>
      </section>

      {/* ── BRANDS ── */}
      <section className="bg-stone-50 py-12 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <p className="text-center text-[10px] text-stone-400 uppercase tracking-[0.2em] mb-8">Our Trusted Brand Partners</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {BRANDS.map((b) => (
              <span key={b} className="text-xl md:text-2xl font-light text-stone-300 hover:text-stone-700 transition-colors duration-300 cursor-default tracking-widest uppercase"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-amber-50 py-16 px-5">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[10px] text-amber-600 uppercase tracking-[0.2em] mb-3">Stay in the Loop</p>
          <h2 className="text-3xl font-light text-stone-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get 10% Off Your First Order
          </h2>
          <p className="text-stone-400 text-sm mb-7">Subscribe for exclusive drops, style tips, and member-only deals.</p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium text-sm">
              <Check size={16} /> You're in! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-0 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border border-stone-300 px-4 py-3.5 text-sm text-stone-700 outline-none focus:border-amber-500 rounded-l-lg bg-white placeholder-stone-300"
              />
              <button
                type="submit"
                className="bg-stone-900 text-white px-6 py-3.5 text-xs tracking-widest uppercase hover:bg-amber-600 transition-colors duration-200 rounded-r-lg font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-stone-900 text-stone-400 py-10 px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            F<span className="text-amber-500">.</span>Mode
          </span>
          <p className="text-xs text-center text-stone-500">© 2026 F.Mode. All rights reserved.</p>
          <div className="flex gap-6 text-xs uppercase tracking-widest">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-amber-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Toast */}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  );
}