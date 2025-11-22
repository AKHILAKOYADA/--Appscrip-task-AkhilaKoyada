# mettā muse - E-commerce Product Discovery Page

A responsive, SEO-optimized product discovery page built with Next.js, React, and TypeScript.

## Features

- ✅ **Responsive Design** - Fully responsive for mobile, tablet, and desktop
- ✅ **SEO Optimized** - Complete metadata, schema markup, and semantic HTML
- ✅ **Product Filtering** - Collapsible filter sidebar with multiple categories
- ✅ **Product Sorting** - Sort by Recommended, Newest, Popular, or Price
- ✅ **Wishlist** - Add products to wishlist with visual feedback
- ✅ **User Authentication** - Login/Signup modal dialog
- ✅ **Newsletter Signup** - Email subscription in footer
- ✅ **Accessibility** - ARIA labels and keyboard navigation support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
storefront/
├── app/
│   ├── page.tsx          # Main product listing page
│   ├── layout.tsx        # Root layout with SEO metadata
│   ├── style.css         # Global styles and responsive design
│   └── globals.css       # Base styles
├── public/
│   └── images/          # Product images
└── package.json
```

## Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **CSS** - Custom styling (no frameworks)

## SEO Features

- Semantic HTML5 structure (H1, H2 tags)
- JSON-LD schema markup
- Optimized meta tags (title, description, OpenGraph, Twitter)
- SEO-friendly image alt texts
- Lazy loading images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private project - All rights reserved
