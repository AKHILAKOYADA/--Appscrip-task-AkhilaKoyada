"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type FilterSection = {
  title: string;
  summary?: string;
  options: string[];
  showUnselect?: boolean;
};

const filterSections: FilterSection[] = [
  {
    title: "Customizable",
    options: ["Customizable"],
  },
  {
    title: "Ideal For",
    summary: "All",
    showUnselect: true,
    options: ["Men", "Women", "Baby & Kids"],
  },
  {
    title: "Occasion",
    summary: "All",
    options: ["Work", "Travel", "Wedding", "Party"],
  },
  {
    title: "Work",
    summary: "All",
    options: ["Casual", "Office", "Outdoor"],
  },
  {
    title: "Fabric",
    summary: "All",
    options: ["Cotton", "Linen", "Silk", "Wool"],
  },
  {
    title: "Segment",
    summary: "All",
    options: ["Accessories", "Apparel", "Home & Living"],
  },
  {
    title: "Suitable For",
    summary: "All",
    options: ["Men", "Women", "Kids"],
  },
  {
    title: "Raw Materials",
    summary: "All",
    options: ["Organic", "Recycled", "Vegan Leather"],
  },
  {
    title: "Pattern",
    summary: "All",
    options: ["Solid", "Printed", "Embroidered"],
  },
];

const sortOptions = [
  "Recommended",
  "Newest First",
  "Popular",
  "Price: Low to High",
  "Price: High to Low",
];

const products = [
  {
    id: "classic-cotton-t-shirt",
    name: "Classic Cotton T-Shirt",
    image: "tshirt.jpg",
    imageAlt: "Classic cotton t-shirt sustainable fashion apparel",
    category: "Apparel",
    price: 1100,
  },
  {
    id: "handloom-kurti-traditional",
    name: "Handloom Kurti Traditional",
    image: "kurthi.jpg",
    imageAlt: "Handloom kurti traditional Indian wear sustainable fashion",
    category: "Apparel",
    price: 2350,
  },
  {
    id: "vegan-leather-handbag",
    name: "Vegan Leather Handbag",
    image: "handbag.jpg",
    imageAlt: "Vegan leather handbag eco-friendly accessories",
    category: "Accessories",
    price: 3200,
  },
  {
    id: "banarasi-silk-saree",
    name: "Banarasi Silk Saree",
    image: "sare.jpg",
    imageAlt: "Banarasi silk saree traditional Indian occasion wear",
    category: "Occasion wear",
    price: 5600,
  },
  {
    id: "copper-spoon-set-handcrafted",
    name: "Copper Spoon Set Handcrafted",
    image: "spoon.jpg",
    imageAlt: "Copper spoon set handcrafted home kitchenware",
    category: "Home & Living",
    price: 850,
  },
  {
    id: "comfortable-cotton-t-shirt",
    name: "Comfortable Cotton T-Shirt",
    image: "tshirtc.jpg",
    imageAlt: "Comfortable cotton t-shirt casual wear sustainable apparel",
    category: "Apparel",
    price: 1400,
  },
  {
    id: "silk-scarf-handwoven",
    name: "Silk Scarf Handwoven",
    image: "scarf.png",
    imageAlt: "Silk scarf handwoven premium accessories",
    category: "Accessories",
    price: 1800,
  },
  {
    id: "short-kurta-casual",
    name: "Short Kurta Casual",
    image: "shortKurthi.png",
    imageAlt: "Short kurta casual traditional Indian wear",
    category: "Apparel",
    price: 2800,
  },
  {
    id: "handmade-home-decor",
    name: "Handmade Home Decor",
    image: "homeDecor.png",
    imageAlt: "Handmade home decor artisan decorative items",
    category: "Home & Living",
    price: 1200,
  },
  {
    id: "leather-wallet-handcrafted",
    name: "Leather Wallet Handcrafted",
    image: "bag.png",
    imageAlt: "Leather wallet handcrafted premium accessories",
    category: "Accessories",
    price: 2400,
  },
  {
    id: "cotton-linen-blend-shirt",
    name: "Premium Denim Jeans",
    image: "jeans.png",
    imageAlt: "Premium denim jeans sustainable fashion casual wear",
    category: "Apparel",
    price: 1950,
  },
  {
    id: "ceramic-tea-set",
    name: "Stainless Steel Water Bottle",
    image: "bottle.png",
    imageAlt: "Stainless steel water bottle eco-friendly reusable",
    category: "Home & Living",
    price: 2100,
  },
];

const footerLinks = {
  muse: [
    "About Us",
    "Stories",
    "Artisans",
    "Boutiques",
    "Contact Us",
    "EU Compliances Docs",
  ],
  quick: [
    "Orders & Shipping",
    "Join/Login as a Seller",
    "Payment & Pricing",
    "Return & Refunds",
    "FAQs",
    "Privacy Policy",
    "Terms & Conditions",
  ],
};

const socialIcons = [
  { name: "Instagram", icon: "📷" },
  { name: "LinkedIn", icon: "💼" },
];

const paymentOptions = [
  "GPay",
  "Mastercard",
  "PayPal",
  "Amex",
  "Apple Pay",
  "Shop Pay",
];

export default function Home() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        filterSections.map((section) => [section.title, true])
      )
  );

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSortOpen(false);
      }
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).classList.contains("modal-backdrop")
      ) {
        setShowLoginModal(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showLoginModal]);

  const sortedProducts = useMemo(() => {
    const nextProducts = [...products];

    switch (sortBy) {
      case "Price: Low to High":
        return nextProducts.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return nextProducts.sort((a, b) => b.price - a.price);
      case "Newest First":
        return nextProducts.reverse();
      case "Popular":
        return nextProducts;
      default:
        return nextProducts;
    }
  }, [sortBy]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setSubscribeMessage("Please enter a valid email address.");
      return;
    }
    setSubscribeMessage("Thanks! We just added you to the list.");
    setEmail("");
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here - integrate with your authentication API
    setShowLoginModal(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle signup logic here - integrate with your authentication API
    setShowLoginModal(false);
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
  };

  return (
    <>
      <div className="top-bar">
        <p>88 Lorem ipsum dolor 88 Lorem ipsum dolor 88 Lorem ipsum dolor</p>
      </div>

      <header>
        <div className="logo-container">
          <div className="logo-icon">◆</div>
          <div className="logo">LOGO</div>
        </div>
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
        <nav className={mobileMenuOpen ? "mobile-open" : ""}>
          <a href="#" onClick={() => setMobileMenuOpen(false)}>
            SHOP
          </a>
          <a href="#" onClick={() => setMobileMenuOpen(false)}>
            SKILLS
          </a>
          <a href="#" onClick={() => setMobileMenuOpen(false)}>
            STORIES
          </a>
          <a href="#" onClick={() => setMobileMenuOpen(false)}>
            ABOUT
          </a>
          <a href="#" onClick={() => setMobileMenuOpen(false)}>
            CONTACT US
          </a>
        </nav>
        <div className="icons">
          <span role="img" aria-label="Search" className="icon">
            🔍
          </span>
          <span role="img" aria-label="Wishlist" className="icon">
            ♡
          </span>
          <span role="img" aria-label="Cart" className="icon">
            🛒
          </span>
          <span role="img" aria-label="Account" className="icon">
            👤
          </span>
          <span className="lang-selector">ENG ▾</span>
        </div>
      </header>

      <main className={`main-container${showFilters ? "" : " no-filters"}`}>
        {showFilters && (
          <aside className="filters">
            <h3>FILTERS</h3>
            {filterSections.map((section) => (
              <div key={section.title} className="filter-section">
                <button
                  type="button"
                  className="filter-header"
                  onClick={() => toggleSection(section.title)}
                >
                  <span>{section.title.toUpperCase()}</span>
                  <span className="filter-caret">
                    {openSections[section.title] ? "▾" : "▸"}
                  </span>
                </button>
                {openSections[section.title] && (
                  <div className="filter-body">
                    {section.summary && (
                      <div className="filter-summary">
                        {section.summary}
                      </div>
                    )}
                    {section.showUnselect && (
                      <button type="button" className="filter-unselect">
                        Unselect all
                      </button>
                    )}
                    <div className="checkbox-list">
                      {section.options.map((option) => (
                        <label key={option} className="checkbox-item">
                          <input type="checkbox" />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </aside>
        )}

        <section
          className={`products-section${showFilters ? "" : " full-width"}`}
        >
          <div className="items-bar">
            <div className="items-left">
              <span className="items-count">3425 ITEMS</span>
              <button
                type="button"
                className="toggle-filter"
                onClick={() => setShowFilters((prev) => !prev)}
              >
                {showFilters ? "HIDE FILTER" : "SHOW FILTER"}
              </button>
            </div>

            <div className="sort-dropdown" ref={dropdownRef}>
              <button
                type="button"
                className="sort-button"
                onClick={() => setSortOpen((prev) => !prev)}
              >
                {sortBy.toUpperCase()} <span className="caret">▾</span>
              </button>
              {sortOpen && (
                <ul className="sort-menu">
                  {sortOptions.map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        className={`sort-option${
                          option === sortBy ? " active" : ""
                        }`}
                        onClick={() => {
                          setSortBy(option);
                          setSortOpen(false);
                        }}
                      >
                        {option.toUpperCase()}
                        {option === sortBy && <span> ✓</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="title-area">
            <h1>Discover Our Products</h1>
            <p>
              Explore our curated collection of handcrafted sustainable fashion,
              accessories, and home decor products. Each piece is carefully
              selected to bring you quality and style.
            </p>
          </div>

          <div className="product-grid">
            {sortedProducts.map((product) => {
              const isSaved = wishlist.has(product.id);

              return (
                <article key={product.id} className="product-card">
                  <Image
                    src={`/images/${product.image}`}
                    alt={product.imageAlt || product.name}
                    width={360}
                    height={360}
                    loading="lazy"
                  />
                  <h2 className="product-title">{product.name}</h2>
                  <p className="price-msg">
                    <button
                      type="button"
                      className="signin-link"
                      onClick={() => setShowLoginModal(true)}
                    >
                      Sign in
                    </button>{" "}
                    or create an account to view pricing
                  </p>
                  <span
                    className={`wish${isSaved ? " active" : ""}`}
                    role="button"
                    aria-pressed={isSaved}
                    tabIndex={0}
                    onClick={() => toggleWishlist(product.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleWishlist(product.id);
                      }
                    }}
                  >
                    {isSaved ? "♥" : "♡"}
                  </span>
                </article>
              );
            })}
          </div>

          <p className="wishlist-counter">
            Wishlist: {wishlist.size} product{wishlist.size === 1 ? "" : "s"}{" "}
            saved
          </p>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div className="footer-signup">
            <h3>BE THE FIRST TO KNOW</h3>
            <p>Sign up for updates from mettā muse.</p>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your e-mail..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email address"
              />
              <button type="submit">SUBSCRIBE</button>
            </form>
            {subscribeMessage && (
              <p
                className="subscribe-feedback"
                aria-live="polite"
                role="status"
              >
                {subscribeMessage}
              </p>
            )}
          </div>

          <div className="footer-contact">
            <h3>CONTACT US</h3>
            <p>+44 221 133 5360</p>
            <p>customercare@mettamuse.com</p>
            <h3>CURRENCY</h3>
            <p>
              <span className="currency-icon">◆</span> USD
            </p>
            <small>
              Transactions will be completed in Euros and a currency reference
              is available on hover.
            </small>
          </div>
        </div>

        <hr />

        <div className="footer-links-row">
          <div className="footer-col">
            <h4 className="footer-brand">mettā muse</h4>
            {footerLinks.muse.map((item) => (
              <p key={item}>
                <a href="#">{item}</a>
              </p>
            ))}
          </div>
          <div className="footer-col">
            <h4>QUICK LINKS</h4>
            {footerLinks.quick.map((item) => (
              <p key={item}>
                <a href="#">{item}</a>
              </p>
            ))}
          </div>
          <div className="footer-col">
            <h4>FOLLOW US</h4>
            <div className="social-icons-container">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="social-icon-link"
                  aria-label={social.name}
                >
                  <span className="social-icon" aria-hidden="true">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
            <h4 className="footer-accepts">mettā muse ACCEPTS</h4>
            <div className="payment-icons-container">
              {paymentOptions.map((payment) => (
                <span key={payment} className="payment-icon">
                  {payment}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2023 mettamuse. All rights reserved.</p>
        </div>
      </footer>

      {showLoginModal && (
        <>
          <div className="modal-backdrop" onClick={() => setShowLoginModal(false)}></div>
          <div className="modal-signin" ref={modalRef}>
            <div className="modal-tabs">
              <button
                type="button"
                className={`modal-tab${isLogin ? " active" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                LOGIN
              </button>
              <button
                type="button"
                className={`modal-tab${!isLogin ? " active" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                SIGN UP
              </button>
            </div>

            {isLogin ? (
              <form onSubmit={handleLogin} className="modal-form">
                <h2>LOGIN</h2>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button type="submit" className="modal-submit">
                  LOGIN
                </button>
                <button
                  type="button"
                  className="close-modal"
                  onClick={() => setShowLoginModal(false)}
                >
                  Close
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="modal-form">
                <h2>SIGN UP</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <button type="submit" className="modal-submit">
                  SIGN UP
                </button>
                <button
                  type="button"
                  className="close-modal"
                  onClick={() => setShowLoginModal(false)}
                >
                  Close
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </>
  );
}
